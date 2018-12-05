const moment = require('moment')

const Spot = require('../models/spot')

const generateSpots = () => {
    Spot.on('index', () => {
        const query = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [ 2.307980, 48.888205] 
            },
        }
        const newData = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [ 2.307980, 48.888205] 
            },
            dateSave: moment(),
            active: true
        }
        Spot.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query1 = {
            name: 'saussure',
            loc: {
                type: 'Point',
                coordinates: [ 2.305294, 48.890264]
            },
        }
        const newData1 = {
            name: 'saussure',
            loc: {
                type: 'Point',
                coordinates: [ 2.305294, 48.890264]
            },
            dateSave: moment(),
            active: true
        }
        Spot.findOneAndUpdate(query1, newData1, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query2 = {
            name: 'tocqueville',
            loc: {
                type: 'Point',
                coordinates: [ 2.305081, 48.889314]
            },
        }
        const newData2 = {
            name: 'tocqueville',
            loc: {
                type: 'Point',
                coordinates: [ 2.305081, 48.889314]
            },
            dateSave: moment(),
            active: true
        }
        Spot.findOneAndUpdate(query2, newData2, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query10 = {
            name: '1',
            loc: {
                type: 'Point',
                coordinates: [2.371842, 48.860442]
            },
        }

        const newData10 = {
            name: '1',
            loc: {
                type: 'Point',
                coordinates: [2.371842, 48.860442]
           
            },
            dateSave: moment(),
            active: true
        }

        Spot.findOneAndUpdate(query10, newData10, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query11 = {
            name: '2',
            loc: {
                type: 'Point',
                coordinates: [2.370864, 48.858707]
            },
        }
        const newData11 = {
            name: '2',
            loc: {
                type: 'Point',
                coordinates: [2.370864, 48.858707]
            },
            dateSave: moment(),
            active: true
        }

        Spot.findOneAndUpdate(query11, newData11, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query12 = {
            name: '3',
            loc: {
                type: 'Point',
                coordinates: [2.369335, 48.858852]
            },
        }
        
        const newData12 = {
            name: '3',
            loc: {
                type: 'Point',
                coordinates: [2.369335, 48.858852]
            },
            dateSave: moment(),
            active: true
        }

        Spot.findOneAndUpdate(query12, newData12, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })
        

    })
}

module.exports = generateSpots;
