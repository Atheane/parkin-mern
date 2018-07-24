import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpots } from '../utils/format'

export default (socket, io) => {
    socket.on("unactivateSpot", coord => {
        console.log("listen on unactivateSpot")
        if (coord) {
            const query =  {
                loc: {
                    type: 'Point',
                    coordinates: [ coord.longitude, coord.latitude] 
                },
            }
            const newData = {
                dateSave: moment(),
                active: false
            }
            Spot.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                console.log(doc, "saved with success");
            })
            User.find({ email: 'damien.biasotto@gmail.com'}, (err, doc) => {
                // console.log("HERE HERE HERE ########### doc found is", doc)
                if (err) {console.log(err.name + ': ' + err.message) }
                Spot.aggregate(
                    [
                        { "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": doc[0].loc.coordinates
                            },
                            "distanceField": "distance",
                            "spherical": true,
                            "maxDistance": 500
                        }},
                        {"$match": {"active": true}}
                    ],
                    (err,spots) => {
                        if (err) {console.log(err.name + ': ' + err.message) }
                        console.log("spots around me and active", spots)
                        io.emit("spotsAroundMe", (spots) ? spots.map(spot => formatSpots(spot)): spots)
                    }
                )
            })
        } else {
            console.log("no coordinates received from front")
        }
    })
}
