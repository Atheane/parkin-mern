import moment from 'moment'
import User from '../models/user'
import Spot from '../models/spot'
import { formatSpot } from '../utils/format'

export default (socket) => {
    socket.on("selectSpot", ({coord, token}) => {
        console.log("listen on selectSpot")
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
                    assignedTo: currentUser
                }
                Spot.findOneAndUpdate(query, newData, {upsert:true}, (err, spot) => {
                    if (err) {console.log(err.name + ': ' + err.message) }
                    console.log(spot, "updated with success")
                    socket.emit("spotsAroundMe", [{ spot: formatSpot(spot), selected: true }])
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
                        socket.broadcast.emit("spotsAroundMe", (spots) ? spots.map(spot => {
                            return {spot: formatSpot(spot), selected: false}
                        }) : spots)
                    }
                )
            })
        } else {
            console.log("on selectSpot, no coordinates received from front", socket.id)
        }
    })
}
