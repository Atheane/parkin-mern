'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userPosition = require('./services/userPosition');

var _userPosition2 = _interopRequireDefault(_userPosition);

var _unactivateSpot = require('./services/unactivateSpot');

var _unactivateSpot2 = _interopRequireDefault(_unactivateSpot);

var _spotsData = require('./constants/spotsData');

var _spotsData2 = _interopRequireDefault(_spotsData);

var _usersData = require('./constants/usersData');

var _usersData2 = _interopRequireDefault(_usersData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || '3000';
// const router = express.Router();

var app = (0, _express2.default)();
var server = require('http').Server(app);

app.use('/', _index2.default);

var mongoDB = 'mongodb://NodeApp:T8hEtfTXzCYe@ds018848.mlab.com:18848/parkin';
_mongoose2.default.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
_mongoose2.default.Promise = global.Promise;
//Get the default connection
var db = _mongoose2.default.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var io = require('socket.io')(server);

(0, _spotsData2.default)();
(0, _usersData2.default)();

io.on('connection', function (socket) {
    console.log('A client just joined on', socket.id);
    (0, _userPosition2.default)(socket);
    (0, _unactivateSpot2.default)(socket, io);
});

app.set('port', port);
server.listen(port);

console.log("server on");