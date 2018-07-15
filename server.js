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

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    // socket.emit('FromAPI', {data: 'from back end!'})
    Spot.find({}, function(err, spots) {
        if (err) {console.log(err.name + ': ' + err.message) }
        socket.emit('spots', spots)
      })
    })
)

app.set('port', port)
server.listen(port)

console.log("server on")