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

var _format = require('../utils/format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
    socket.on("deleteSpot", function (_ref) {
        var coord = _ref.coord,
            token = _ref.token;

        console.log("listen on deleteSpot");
        if (coord && token) {
            console.log('coord', coord);
            _user2.default.findOne({ token: token }, function (err, currentUser) {
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                console.log("user here here here", currentUser);

                var query = {
                    loc: {
                        type: 'Point',
                        coordinates: [coord.longitude, coord.latitude]
                    },
                    active: false
                };
                _spot2.default.remove(query, function (err) {
                    if (err) {
                        console.log(err.name + ': ' + err.message);
                    }
                    console.log("deleted with success");
                });

                _spot2.default.aggregate([{ "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": currentUser.loc.coordinates
                        },
                        "distanceField": "distance",
                        "spherical": true,
                        "maxDistance": 800
                    } }, { "$match": { "active": true } }], function (err, spots) {
                    if (err) {
                        console.log(err.name + ': ' + err.message);
                    }
                    console.log("spots around me and active", spots);
                    var toFormat = function toFormat(s) {
                        return {
                            spot: (0, _format.formatSpot)(s),
                            selected: false
                        };
                    };
                    var formattedSpots = spots.map(toFormat);
                    socket.emit("spotsAroundMe", spots ? formattedSpots : spots);
                    socket.broadcast.emit("spotsAroundMe", spots ? formattedSpots : spots);
                });
            });
        } else {
            console.log("on deleteSpot, no coordinates received from front", socket.id);
        }
    });
};