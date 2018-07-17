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

const fakeSpots = [{"coords":{"latitude":48.78971813,"longitude":2.37082766},"name":"Paris75"},{"coords":{"latitude":48.81820297,"longitude":2.33859205},"name":"Paris76"},{"coords":{"latitude":48.84063484,"longitude":2.47160655},"name":"Paris77"},{"coords":{"latitude":48.80340461,"longitude":2.29507125},"name":"Paris78"},{"coords":{"latitude":48.94060415,"longitude":2.30952801},"name":"Paris79"},{"coords":{"latitude":48.8662713,"longitude":2.22175878},"name":"Paris80"},{"coords":{"latitude":48.83494185,"longitude":2.30195669},"name":"Paris81"},{"coords":{"latitude":48.86320746,"longitude":2.47949396},"name":"Paris82"},{"coords":{"latitude":48.87379974,"longitude":2.33602359},"name":"Paris83"},{"coords":{"latitude":48.89775794,"longitude":2.41281186},"name":"Paris84"},{"coords":{"latitude":48.87202483,"longitude":2.34980606},"name":"Paris85"},{"coords":{"latitude":48.84352863,"longitude":2.39218977},"name":"Paris86"},{"coords":{"latitude":48.91427919,"longitude":2.36929494},"name":"Paris87"},{"coords":{"latitude":48.78238517,"longitude":2.40988252},"name":"Paris88"},{"coords":{"latitude":48.89262459,"longitude":2.34002366},"name":"Paris89"},{"coords":{"latitude":48.84318815,"longitude":2.43710321},"name":"Paris90"},{"coords":{"latitude":48.88355096,"longitude":2.31925355},"name":"Paris91"},{"coords":{"latitude":48.8804737,"longitude":2.46812966},"name":"Paris92"},{"coords":{"latitude":48.8070782,"longitude":2.4613076},"name":"Paris93"},{"coords":{"latitude":48.89446548,"longitude":2.40696333},"name":"Paris94"},{"coords":{"latitude":48.94522178,"longitude":2.36639941},"name":"Paris95"},{"coords":{"latitude":48.84428028,"longitude":2.2299356},"name":"Paris96"},{"coords":{"latitude":48.84952145,"longitude":2.25126534},"name":"Paris97"},{"coords":{"latitude":48.94162237,"longitude":2.3613026},"name":"Paris98"},{"coords":{"latitude":48.87977128,"longitude":2.37956547},"name":"Paris99"},{"coords":{"latitude":48.80042944,"longitude":2.41137824},"name":"Paris100"}]

io.on('connection', (socket => {
    console.log('A client just joined on', socket.id)
    // socket.emit('FromAPI', {data: 'from back end!'})
    Spot.find({}, function(err, spots) {
        if (err) {console.log(err.name + ': ' + err.message) }
        socket.emit('spots', fakeSpots)
      })
    })
)

app.set('port', port)
server.listen(port)

console.log("server on")