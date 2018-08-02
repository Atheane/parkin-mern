import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'

export default (socket) => {
    socket.on("giveSpot", ({coord, token}) => {
        console.log("listen on giveSpot")
        if (coord && token) {
            console.log('coord', coord)
            User.findOne({ token }, (err, currentUser) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                console.log("user here here here", currentUser)
             
                const query =  {
                    loc: {
                        type: 'Point',
                        coordinates: [ coord.longitude, coord.latitude] 
                    },
                    active: true
                }
                Spot.create(query, (err) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log("given with success")
                })
         
                Spot.aggregate(
                    [
                        { "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": currentUser.loc.coordinates
                            },
                            "distanceField": "distance",
                            "spherical": true,
                            "maxDistance": 800
                        }},
                        {"$match": {"active": true}}
                    ],
                    (err,spots) => {
                        if (err) {console.log(err.name + ': ' + err.message) }
                        console.log("spots around me and active", spots)
                        const toFormat = (s) => {
                          return {
                            spot: formatSpot(s),
                            selected: false
                          }
                        }
                        const formattedSpots = spots.map(toFormat)
                        socket.emit("spotsAroundMe", (spots) ? formattedSpots : spots)
                        socket.broadcast.emit("spotsAroundMe", (spots) ? formattedSpots : spots)
                    }
                )
            })
        } else {
            console.log("on giveSpot, no coordinates received from front", socket.id)
        }
    })
}
