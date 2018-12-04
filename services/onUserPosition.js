import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'

export default (socket) => {
    socket.on("EMIT_USERPOSITION", ({ userPosition, token }) => {
        console.log("EMIT_USERPOSITION", userPosition)
        if (userPosition && token) {
            const newData = {
                loc: {
                    type: 'Point',
                    coordinates: [ userPosition.longitude, userPosition.latitude] 
                },
                dateUpdate: moment()
            }
            User.findOneAndUpdate({token}, newData, {upsert:true}, (err, doc) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                // todo: socket.emit saved avec success pour le front
                console.log(doc, "saved with success");
            })
            Spot.aggregate(
                [  
                    { "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [userPosition.longitude, userPosition.latitude]
                        },
                        "distanceField": "distance",
                        "spherical": true,
                        "maxDistance": 800
                    }},
                    {"$match": {"active": true}},
                ],
                (err,spots) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log("spots around me and active", spots)
                    socket.emit("ON_SPOTS", (spots) ? spots.map(spot => {
                        return {spot: formatSpot(spot), selected: false}
                    }) : spots)
                }
            )
        } else {
            console.log("on EMIT_POSITION, no data received from front", socket.id)
        }
    })
}