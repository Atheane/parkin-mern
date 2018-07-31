'use strict'

import express from 'express'
import index from './routes/index'
import mongoose from 'mongoose'
import 'babel-polyfill'

import onInitialUserPosition from './services/onInitialUserPosition'
import onMovingUserPosition from './services/onMovingUserPosition'
import onTokenPushNotification from './services/onTokenPushNotification'
import onSelectSpot from './services/onSelectSpot'

import generateSpots from './constants/spotsData'
import generateUsers from './constants/usersData'

const port = process.env.PORT || '3000'
// const router = express.Router();

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

generateSpots()
generateUsers()

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    onInitialUserPosition(socket)
    onMovingUserPosition(socket)
    onTokenPushNotification(socket)
    onSelectSpot(socket)
}))

app.set('port', port)
server.listen(port)

console.log("server on")
