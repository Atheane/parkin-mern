import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'
import { collection } from '../server.js'

export default (socket) => {
    socket.on("EMIT_SELECTSPOT", ({coord, token}) => {
        console.log("listen on EMIT_SELECTSPOT")
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
                }
                const newData = {
                    dateSave: moment(),
                    active: false,
                }   // to-do if two people ask at the same place exactly and the sale time exactly, we may have pb
                Spot.findOneAndUpdate(query, newData, {upsert:true}, (err, spot) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log(spot, "updated with success")
                    socket.emit("ON_SPOTS", [{ spot: formatSpot(spot), selected: true }])
                    collection.remove(socket)
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

                        collection.emit('ON_SPOTS', data)

                    }
                )
            })
        } else {
            console.log("on EMIT_SELECTSPOT, no coordinates received from front", socket.id)
        }
    })
}
