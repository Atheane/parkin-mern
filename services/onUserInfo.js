import User from '../models/user'
import moment from 'moment'

export default (socket) => {
    socket.on("userInfo", userInfo => {
        console.log("userInfo", userInfo)
        if (userInfo && userInfo.id) {
          const token = userInfo.id.toString()
          User.findOne({token}, (err, user) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            if (user) {
              console.log(user, "found with success")
              return user
            } else {
              let newUser = new User({
                name: userInfo.name, 
                token: userInfo.id,
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
          console.log({errorMessage: "userInfo, no data received from front"}, socket.id)
          return {errorMessage: "userInfo, no data received from front"}
        }
    })
}