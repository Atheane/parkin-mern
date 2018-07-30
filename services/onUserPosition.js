import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpots } from '../utils/format'

export default (socket) => {
    socket.on("userPosition", userPosition => {
        console.log("userPosition", userPosition)
        if (userPosition) {
            const query = {
                username: 'Come',
                email: 'damien.biasotto@gmail.com',
            }
            const newData = {
                loc: {
                    type: 'Point',
                    coordinates: [ userPosition.longitude, userPosition.latitude] 
                },
                dateUpdate: moment()
            }
            User.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
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
                        "maxDistance": 500
                    }},
                    {"$match": {"active": true}},
                ],
                (err,spots) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log("spots around me and active", spots)
                    socket.emit("spotsAroundMe", (spots) ? spots.map(spot => formatSpots(spot)): spots)
                }
            )
        } else {
            console.log("no data received from front")
        }
    })
}