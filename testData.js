const moment = require('moment')

const Spot = require('./models/spot')

const generateTestData = () => {
    Spot.on('index', () => {
        const query = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [ 2.307980, 48.888205] 
            }
        }
        const newData = {
            name: 'pereire',
            loc: {
                type: 'Point',
                coordinates: [ 2.307980, 48.888205] 
            },
            dateSave: moment()
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
            }
        }
        const newData1 = {
            name: 'saussure',
            loc: {
                type: 'Point',
                coordinates: [ 2.305294, 48.890264]
            },
            dateSave: moment()
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
            }
        }
        const newData2 = {
            name: 'tocqueville',
            loc: {
                type: 'Point',
                coordinates: [ 2.305081, 48.889314]
            },
            dateSave: moment()
        }
        Spot.findOneAndUpdate(query2, newData2, {upsert:true}, (err, doc) => {
            if (err) {console.log(err.name + ': ' + err.message) }
            // todo: socket.emit saved avec success pour le front
            console.log(doc, "saved with success");
        })
    })
}

module.exports = generateTestData;
