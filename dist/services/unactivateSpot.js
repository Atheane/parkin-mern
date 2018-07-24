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

exports.default = function (socket, io) {
    socket.on("unactivateSpot", function (coord) {
        console.log("listen on unactivateSpot");
        if (coord) {
            var query = {
                loc: {
                    type: 'Point',
                    coordinates: [coord.longitude, coord.latitude]
                }
            };
            var newData = {
                dateSave: (0, _moment2.default)(),
                active: false
            };
            _spot2.default.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                console.log(doc, "saved with success");
            });
            _user2.default.find({ email: 'damien.biasotto@gmail.com' }, function (err, doc) {
                // console.log("HERE HERE HERE ########### doc found is", doc)
                if (err) {
                    console.log(err.name + ': ' + err.message);
                }
                _spot2.default.aggregate([{ "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": doc[0].loc.coordinates
                        },
                        "distanceField": "distance",
                        "spherical": true,
                        "maxDistance": 500
                    } }, { "$match": { "active": true } }], function (err, spots) {
                    if (err) {
                        console.log(err.name + ': ' + err.message);
                    }
                    console.log("spots around me and active", spots);
                    io.emit("spotsAroundMe", spots ? spots.map(function (spot) {
                        return (0, _format.formatSpots)(spot);
                    }) : spots);
                });
            });
        } else {
            console.log("no coordinates received from front");
        }
    });
};