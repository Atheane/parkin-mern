import User from '../models/user'

export default (socket) => {
    socket.on("tokenPushNotification", ({pushToken, token}) => {
        console.log("listen on tokenPushNotification")
        console.log(Date.now())
        console.log(pushToken)
        if (pushToken && token) {
          // to-do automatate with data from front rather than fake data 
          User.findOneAndUpdate({ token }, { pushToken }, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            console.log(doc, "updated with success");
          })
        } else {
          console.log("on tokenPushNotification, no token was not received from front", socket.id)
        }
    })
}
