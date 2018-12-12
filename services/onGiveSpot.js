import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { collection } from '../server'

export default (socket) => {
    socket.on("EMIT_GIVESPOT", ({coord, token}) => {
        console.log("listen on EMIT_GIVESPOT")
        if (coord && token) {
            console.log('coord', coord)
            User.findOne({ token }, (err, currentUser) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                console.log("user:", currentUser)
             
                const query =  {
                    loc: {
                        type: 'Point',
                        coordinates: [ coord.longitude, coord.latitude] 
                    },
                    active: true,
                    givenBy: token
                }

                Spot.create(query, (err) => {
                    if (err) {
                        console.log(err.name + ': ' + err.message)
                    } else {
                        console.log("given with success")
                    }
                })

                collection.emit('NEW_SPOT', {
                    spot: {
                        name: `@${currentUser.name}`,
                        coords: {
                            latitude: coord.latitude,
                            longitude: coord.longitude
                        }
                    },
                    selected: false
                  }
                )
            })
        } else {
            console.log("on EMIT_GIVESPOT, no coordinates received from front", socket.id)
        }
    })
}
