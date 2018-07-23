const moment = require('moment')

const Spot = require('./models/spot')

const generateTestData = () => {
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
            active: false
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

        const query3 = {
            name: 'tessier',
            loc: {
                type: 'Point',
                coordinates: [ 2.376003, 48.896645]
            },
        }
        const newData3 = {
            name: 'tessier',
            loc: {
                type: 'Point',
                coordinates: [ 2.376003, 48.896645]
            },
            dateSave: moment(),
            active: true
        }
        Spot.findOneAndUpdate(query3, newData3, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

        const query4 = {
            name: 'macdonald',
            loc: {
                type: 'Point',
                coordinates: [2.372508, 48.898578]
            },
        }
        const newData4 = {
            name: 'macdonald',
            loc: {
                type: 'Point',
                coordinates: [2.372508, 48.898578]
            },
            dateSave: moment(),
            active: true
        }
        Spot.findOneAndUpdate(query4, newData4, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })

    })
}

module.exports = generateTestData;
