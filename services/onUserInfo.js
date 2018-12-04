import User from '../models/user'
import moment from 'moment'

export default (socket) => {
    socket.on("EMIT_USERDATA", facebookJson => {
        console.log("EMIT_USERDATA", facebookJson)
        if (facebookJson && facebookJson.id) {
          const token = facebookJson.id.toString()
          User.findOne({token}, (err, user) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            if (user) {
              console.log(user, "found with success")
              return user
            } else {
              let newUser = new User({
                name: facebookJson.name, 
                token: facebookJson.id,
                active: true,
                dateInscription: moment(),
              })
              newUser.save( (err) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                console.log(newUser, "saved with success")
              })
              return newUser
            }
          })
        } else {
          console.log({errorMessage: "USER, no data received from front"}, socket.id)
          return {errorMessage: "USER, no data received from front"}
        }
    })
}