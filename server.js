'use strict'

const express = require('express')
const port = process.env.PORT || '3000'
const index = require('./routes/index')
// const router = express.Router();
const mongoose = require('mongoose')

const app = express()
const server = require('http').Server(app)

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
const Spot = require('./models/spot')

// const spot = new Spot({ 
//     "loc": { 
//         "type": "Point",
//         "coordinates": [2.377866, 48.898346]
//     }
// });

const waitForIndex = () => {
    return new Promise((resolve, reject) => {
      Spot.on('index', error=>error ? reject(error) : resolve());
    });
  }

const formatSpots = (spot) => {
    return {
        name: spot.name,
        coords: {
            latitude: spot.loc.coordinates[1],
            longitude: spot.loc.coordinates[0]
        }
    } 
}

Spot.on('index', () => {
    new Spot({
        name: 'Paris75',
        loc: {
            type: 'Point',
            // Place longitude first, then latitude
            coordinates: [ 2.37082766, 48.78971813]
        }
    }).save();
 });

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    const queryNearSpots = { 
        loc: { 
            $nearSphere: [ 2.37082766, 48.78971813],
            $maxDistance: 1000,
        }
    };
    Spot.find(queryNearSpots, (err, spots) => {
        if (err) {console.log(err.name + ': ' + err.message) }
        console.log("spots", spots);
        socket.emit("spots", (spots) ? spots.map(spot => formatSpots(spot)): spots)
    });
}));
    // waitForIndex().then(() => {
    //     Spot.aggregate(
    //         [
    //             { "$geoNear": {
    //                 "near": {
    //                     "type": "Point",
    //                     "coordinates": [2.377866, 48.898346]
    //                 },
    //                 "distanceField": "distance",
    //                 "spherical": true,
    //                 "maxDistance": 10000
    //             }}
    //         ],
    //         function(err,spots) {
    //             if (err) {console.log(err.name + ': ' + err.message) }
    //             console.log("spots", spots);
    //             socket.emit("spots", (spots) ? spots.map(spot => formatSpots(spot)): spots)
    //         }
    //     )
    //     })
    // })


app.set('port', port)
server.listen(port)

console.log("server on")