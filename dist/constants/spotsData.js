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

        var query3 = {
            name: 'tessier',
            loc: {
                type: 'Point',
                coordinates: [2.376003, 48.896645]
            }
        };
        var newData3 = {
            name: 'tessier',
            loc: {
                type: 'Point',
                coordinates: [2.376003, 48.896645]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query3, newData3, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query4 = {
            name: 'macdonald',
            loc: {
                type: 'Point',
                coordinates: [2.372508, 48.898578]
            }
        };
        var newData4 = {
            name: 'macdonald',
            loc: {
                type: 'Point',
                coordinates: [2.372508, 48.898578]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query4, newData4, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query5 = {
            name: 'paulbert',
            loc: {
                type: 'Point',
                coordinates: [2.262608, 48.984230]
            }
        };
        var newData5 = {
            name: 'paulbert',
            loc: {
                type: 'Point',
                coordinates: [2.262608, 48.984230]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query5, newData5, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query6 = {
            name: 'nadine',
            loc: {
                type: 'Point',
                coordinates: [2.260071, 48.985867]
            }
        };
        var newData6 = {
            name: 'nadine',
            loc: {
                type: 'Point',
                coordinates: [2.260071, 48.985867]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query6, newData6, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query7 = {
            name: 'fort',
            loc: {
                type: 'Point',
                coordinates: [2.378083, 48.898483]
            }
        };

        var newData7 = {
            name: 'fort',
            loc: {
                type: 'Point',
                coordinates: [2.378083, 48.898483]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query7, newData7, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query8 = {
            name: 'recup',
            loc: {
                type: 'Point',
                coordinates: [2.408022, 48.912241]
            }
        };

        var newData8 = {
            name: 'recup',
            loc: {
                type: 'Point',
                coordinates: [2.408022, 48.912241]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query8, newData8, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query9 = {
            name: 'recup fort',
            loc: {
                type: 'Point',
                coordinates: [2.404086, 48.914768]
            }
        };

        var newData9 = {
            name: 'recup fort',
            loc: {
                type: 'Point',
                coordinates: [2.404086, 48.914768]
            },
            dateSave: moment(),
            active: true
        };
        Spot.findOneAndUpdate(query9, newData9, { upsert: true }, function (err, doc) {
            if (err) {
                console.log(err.name + ': ' + err.message);
            }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        });

        var query10 = {
            name: 'ici',
            loc: {
                type: 'Point',
                coordinates: [2.371870, 48.862424]
            }
        };

        var newData10 = {
            name: 'ici',
            loc: {
                type: 'Point',
                coordinates: [2.371870, 48.862424]

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
            name: 'la',
            loc: {
                type: 'Point',
                coordinates: [2.372125, 48.861286]
            }
        };

        var newData11 = {
            name: 'la',
            loc: {
                type: 'Point',
                coordinates: [2.372125, 48.861286]
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
            name: 'et la',
            loc: {
                type: 'Point',
                coordinates: [2.374507, 48.861291]
            }
        };

        var newData12 = {
            name: 'et la',
            loc: {
                type: 'Point',
                coordinates: [2.374507, 48.861291]
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