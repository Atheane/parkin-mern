import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'
import { email } from '../constants/currentUser'

export default (socket) => {
    socket.on("userPosition", userPosition => {
        console.log("userPosition", userPosition)
        if (userPosition) {
            const newData = {
                loc: {
                    type: 'Point',
                    coordinates: [ userPosition.longitude, userPosition.latitude] 
                },
                dateUpdate: moment()
            }
            User.findOneAndUpdate({email}, newData, {upsert:true}, (err, doc) => {
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
                    socket.emit("spotsAroundMe", (spots) ? spots.map(spot => {
                        return {spot: formatSpot(spot), selected: false}
                    }) : spots)
                }
            )
        } else {
            console.log("onUserPosition, no data received from front", socket.id)
        }
    })
}