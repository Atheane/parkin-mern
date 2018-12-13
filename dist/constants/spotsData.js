'use strict';

var moment = require('moment');

var Spot = require('../models/spot');

var generateSpots = function generateSpots() {
    Spot.on('index', function () {
        var query = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [2.307980, 48.888205]
            }
        };
        var newData = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [2.307980, 48.888205]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query1 = {
            name: 'saussure',
            loc: {
                type: 'Point',
                coordinates: [2.305294, 48.890264]
            }
        };
        var newData1 = {
            name: 'saussure',
            loc: {
                type: 'Point',
                coordinates: [2.305294, 48.890264]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query1, newData1, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query2 = {
            name: 'tocqueville',
            loc: {
                type: 'Point',
                coordinates: [2.305081, 48.889314]
            }
        };
        var newData2 = {
            name: 'tocqueville',
            loc: {
                type: 'Point',
                coordinates: [2.305081, 48.889314]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query2, newData2, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query10 = {
            name: '1',
            loc: {
                type: 'Point',
                coordinates: [2.371842, 48.860442]
            }
        };

        var newData10 = {
            name: '1',
            loc: {
                type: 'Point',
                coordinates: [2.371842, 48.860442]

            },
            dateSave: moment(),
            active: true
        };

        Spot.findOneAndUpdate(query10, newData10, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query11 = {
            name: '2',
            loc: {
                type: 'Point',
                coordinates: [2.370864, 48.858707]
            }
        };
        var newData11 = {
            name: '2',
            loc: {
                type: 'Point',
                coordinates: [2.370864, 48.858707]
            },
            dateSave: moment(),
            active: true
        };

        Spot.findOneAndUpdate(query11, newData11, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query12 = {
            name: '3',
            loc: {
                type: 'Point',
                coordinates: [2.369335, 48.858852]
            }
        };

        var newData12 = {
            name: '3',
            loc: {
                type: 'Point',
                coordinates: [2.369335, 48.858852]
            },
            dateSave: moment(),
            active: true
        };

        Spot.findOneAndUpdate(query12, newData12, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });
    });
};

module.exports = generateSpots;