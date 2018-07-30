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
    socket.on("userPosition", function (userPosition) {
        console.log("userPosition", userPosition);
        if (userPosition) {
            var query = {
                username: 'Come',
                email: 'damien.biasotto@gmail.com'
            };
            var newData = {
                loc: {
                    type: 'Point',
                    coordinates: [userPosition.longitude, userPosition.latitude]
                },
                dateUpdate: (0, _moment2.default)()
            };
            _user2.default.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                // todo: socket.emit saved avec success pour le front
                console.log(doc, "saved with success");
            });
            _spot2.default.aggregate([{ "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [userPosition.longitude, userPosition.latitude]
                    },
                    "distanceField": "distance",
                    "spherical": true,
                    "maxDistance": 500
                } }, { "$match": { "active": true } }], function (err, spots) {
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                console.log("spots around me and active", spots);
                socket.emit("spotsAroundMe", spots ? spots.map(function (spot) {
                    return (0, _format.formatSpots)(spot);
                }) : spots);
            });
        } else {
            console.log("no data received from front");
        }
    });
};