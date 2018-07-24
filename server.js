'use strict'

const express = require('express')
const port = process.env.PORT || '3000'
const index = require('./routes/index')
// const router = express.Router();
const mongoose = require('mongoose')

const app = express()
const server = require('http').Server(app)

import userPosition from './services/userPosition'
import unactivateSpot from './services/unactivateSpot'

const generateSpots = require('./constants/spotsData')
const generateUsers = require('./constants/usersData')

const moment = require('moment')

const Spot = require('./models/spot')
const User = require('./models/user')


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

generateSpots()
generateUsers()

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    userPosition(socket)
    unactivateSpot(socket, io)
}));

app.set('port', port)
server.listen(port)

console.log("server on")
