import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'
import { collection } from '../server.js'

export default (socket) => {
    socket.on("EMIT_DELETESPOT", ({coord, token}) => {
        console.log("listen on EMIT_DELETESPOT")
        if (coord && token) {
            console.log('coord', coord)
            User.findOne({ token }, (err, currentUser) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                console.log("user here here here", currentUser)
             
                const query =  {
                    loc: {
                        type: 'Point',
                        coordinates: coord 
                    },
                    active: false
                }
                Spot.remove(query, (err) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log("deleted with success")
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
                        const data = (spots) ? spots.map(spot => {
                            return {spot: formatSpot(spot), selected: false}
                        }) : spots
                        collection.add(socket)
                        collection.emit('ON_SPOTS', data)
                    }
                )
            })
        } else {
            console.log("on deleteSpot, no coordinates received from front", socket.id)
        }
    })
}
