import User from '../models/user'
import { email } from '../constants/currentUser'

export default (socket) => {
    socket.on("tokenPushNotification", (tokenPushNotification) => {
        console.log("listen on tokenPushNotification")
        console.log(Date.now())
        console.log(tokenPushNotification)
        if (tokenPushNotification) {
          // to-do automatate with data from front rather than fake data 
          User.findOneAndUpdate({ email }, { tokenPushNotification }, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            console.log(doc, "updated with success");
          })
        } else {
          console.log("on tokenPushNotification, no token was not received from front", socket.id)
        }
    })
}
