import Expo from 'expo-server-sdk';
import User from '../models/user'
import Spot from '../models/spot'
import { email } from '../constants/currentUser'
const geodist = require('geodist')

let expo = new Expo()

export default (socket) => {
    User.findOne({email}, (err, user) => {
      console.log("user", user)
      if (err) {console.log(err.name + ': ' + err.message) }
      const pushToken = user.tokenPushNotification;
      Spot.findOne({assignedTo: user}, (err, spot) => {
        console.log("spot", spot)
        if (err) {console.log(err.name + ': ' + err.message) }
        if (spot) {
          socket.on("movingUserPosition", userPosition => {
            console.log("movingUserPosition", userPosition)
            if (userPosition) {
                const shouldPushANotification = geodist(
                  {lat: userPosition.latitude, lon: userPosition.longitude},
                  {lat: spot.loc.coordinates[1], lon: spot.loc.coordinates[0]},
                  {unit: 'meters', limit: 100}
                )
                if (shouldPushANotification) {
                  const title = 'Parkin'
                  const body = 'Vous êtes arrivé'
                  const message = {
                    to: pushToken,
                    sound: 'default',
                    title,
                    body,
                    data: { message: `${title} - ${body}` }
                  }
                  socket.emit("spotNearMe", message)
                  if (!Expo.isExpoPushToken(pushToken)) {
                    console.error(`Push token ${pushToken} is not a valid Expo push token`)
                  }
                  let messages = []
                  messages.push(message)
                  let chunks = expo.chunkPushNotifications(messages);
                  let tickets = []
                  const pushNotifications = async () => {
                    // Send the chunks to the Expo push notification service. There are
                    // different strategies you could use. A simple one is to send one chunk at a
                    // time, which nicely spreads the load out over time:
                    for (let chunk of chunks) {
                      try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk)
                        tickets.push(...ticketChunk)
                        // NOTE: If a ticket contains an error code in ticket.details.error, you
                        // must handle it appropriately. The error codes are listed in the Expo
                        // documentation:
                        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
                      } catch (error) {
                        console.error(error)
                      }
                    }
                  }
                  pushNotifications()
                }
            } else {
                console.log("onMovingUserPosition, no data received from front", socket.id)
            }
          })
        }
      })
    })
}