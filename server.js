'use strict'

const express = require('express')
const port = process.env.PORT || '3000'
const index = require('./routes/index')
// const router = express.Router();
const mongoose = require('mongoose')

const app = express()
const server = require('http').Server(app)

const generateTestData = require('./testData')

const moment = require('moment')

const Spot = require('./models/spot')


app.use('/', index)

const mongoDB = 'mongodb://NodeApp:T8hEtfTXzCYe@ds018848.mlab.com:18848/parkin'
mongoose.connect(mongoDB, { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
//Get the default connection
const db = mongoose.connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const io = require('socket.io')(server)

generateTestData()

const formatSpots = (spot) => {
    return {
        name: spot.name,
        coords: {
            latitude: spot.loc.coordinates[1],
            longitude: spot.loc.coordinates[0]
        }
    } 
}

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    socket.on("userPosition", userPosition => {
        console.log("userPosition", userPosition)
        if (userPosition) {
            Spot.aggregate(
                [
                    { "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [userPosition.longitude, userPosition.latitude]
                        },
                        "$match": {"active": true},
                        "distanceField": "distance",
                        "spherical": true,
                        "maxDistance": 500
                    }}
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
                loc: {
                    type: 'Point',
                    coordinates: [ coord.longitude, coord.latitude] 
                },
                dateSave: moment(),
                active: false
            }
            Spot.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
                if (err) {console.log(err.name + ': ' + err.message) }
                // todo: socket.emit saved avec success pour le front
                console.log(doc, "saved with success");
            }) 
        } else {
            console.log("no coordinates received from front")
        }
    })

}));

app.set('port', port)
server.listen(port)

console.log("server on")