'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _spot = require('../models/spot');

var _spot2 = _interopRequireDefault(_spot);

var _server = require('../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
    socket.on("EMIT_GIVESPOT", function (_ref) {
        var coord = _ref.coord,
            token = _ref.token;

        console.log("listen on EMIT_GIVESPOT");
        if (coord && token) {
            console.log('coord', coord);
            _user2.default.findOne({ token: token }, function (err, currentUser) {
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                console.log("user:", currentUser);

                var query = {
                    loc: {
                        type: 'Point',
                        coordinates: [coord.longitude, coord.latitude]
                    },
                    active: true,
                    givenBy: token
                };

                _spot2.default.create(query, function (err) {
                    if (err) {
                        console.log(err.name + ': ' + err.message);
                    } else {
                        console.log("given with success");
                    }
                });

                _server.collection.emit('ON_NEWSPOT', {
                    spot: {
                        name: '@' + currentUser.name,
                        coords: {
                            latitude: coord.latitude,
                            longitude: coord.longitude
                        }
                    },
                    selected: false
                });
            });
        } else {
            console.log("on EMIT_GIVESPOT, no coordinates received from front", socket.id);
        }
    });
};