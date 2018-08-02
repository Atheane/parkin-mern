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
    socket.on("selectSpot", function (_ref) {
        var coord = _ref.coord,
            token = _ref.token;

        console.log("listen on selectSpot");
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
                    }
                };
                var newData = {
                    dateSave: (0, _moment2.default)(),
                    active: false,
                    assignedTo: currentUser
                };
                _spot2.default.findOneAndUpdate(query, newData, { upsert: true }, function (err, spot) {
                    if (err) {
                        console.log(err.name + ': ' + err.message);
                    }
                    console.log(spot, "updated with success");
                    socket.emit("spotsAroundMe", [{ spot: (0, _format.formatSpot)(spot), selected: true }]);
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
                    socket.broadcast.emit("spotsAroundMe", spots ? spots.map(function (spot) {
                        return { spot: (0, _format.formatSpot)(spot), selected: false };
                    }) : spots);
                });
            });
        } else {
            console.log("on selectSpot, no coordinates received from front", socket.id);
        }
    });
};