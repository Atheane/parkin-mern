'use strict';

var moment = require('moment');

var User = require('../models/user');

var generateUsers = function generateUsers() {
    var query = {
        username: 'Come',
        email: 'damien.biasotto@gmail.com'
    };
    var newData = {
        loc: {
            type: 'Point',
            coordinates: [2.262760, 48.984609]
        },
        dateUpdate: moment(),
        active: true
    };
    User.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
        if (err) {
            console.log(err.name + ': ' + err.message);
        }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    });
    var query1 = {
        username: 'Elo',
        email: 'eroyant@gmail.com'
    };
    var newData1 = {
        loc: {
            type: 'Point',
            coordinates: [2.377853, 48.898287]
        },
        dateUpdate: moment(),
        active: true
    };
    User.findOneAndUpdate(query1, newData1, { upsert: true }, function (err, doc) {
        if (err) {
            console.log(err.name + ': ' + err.message);
        }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    });

    var query2 = {
        username: 'Arthur',
        email: 'arthur.vinsont@mailoop.com'
    };
    var newData2 = {
        loc: {
            type: 'Point',
            coordinates: [2.307980, 48.888205]
        },
        dateUpdate: moment(),
        active: true
    };
    User.findOneAndUpdate(query2, newData2, { upsert: true }, function (err, doc) {
        if (err) {
            console.log(err.name + ': ' + err.message);
        }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    });
};

module.exports = generateUsers;