'use strict';

var _userPosition = require('./services/userPosition');

var _userPosition2 = _interopRequireDefault(_userPosition);

var _unactivateSpot = require('./services/unactivateSpot');

var _unactivateSpot2 = _interopRequireDefault(_unactivateSpot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var port = process.env.PORT || '3000';
var index = require('./routes/index');
// const router = express.Router();
var mongoose = require('mongoose');

var app = express();
var server = require('http').Server(app);

var generateSpots = require('./constants/spotsData');
var generateUsers = require('./constants/usersData');

var moment = require('moment');

var Spot = require('./models/spot');
var User = require('./models/user');

app.use('/', index);

var mongoDB = 'mongodb://NodeApp:T8hEtfTXzCYe@ds018848.mlab.com:18848/parkin';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var io = require('socket.io')(server);

generateSpots();
generateUsers();

io.on('connection', function (socket) {
    console.log('A client just joined on', socket.id);
    (0, _userPosition2.default)(socket);
    (0, _unactivateSpot2.default)(socket, io);
});

app.set('port', port);
server.listen(port);

console.log("server on");