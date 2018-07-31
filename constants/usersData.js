const moment = require('moment')

const User = require('../models/user')

const generateUsers = () => {
    const query = {
        username: 'Come',
        email: 'damien.biasotto@gmail.com',
    }
    const newData = {
        loc: {
            type: 'Point',
            coordinates: [2.262760, 48.984609] 
        },
        dateUpdate: moment(),
        active: true
    }
    User.findOneAndUpdate(query, newData, {upsert:true}, (err, doc) => {
        if (err) {console.log(err.name + ': ' + err.message) }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    })
    const query1 = {
        username: 'Elo',
        email: 'eroyant@gmail.com',
    }
    const newData1 = {
        loc: {
            type: 'Point',
            coordinates: [2.307080, 48.888257]
        },
        dateUpdate: moment(),
        active: true
    }
    User.findOneAndUpdate(query1, newData1, {upsert:true}, (err, doc) => {
        if (err) {console.log(err.name + ': ' + err.message) }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    })

    const query2 = {
        username: 'Arthur',
        email: 'arthur.vinson@mailoop.com',
    }
    const newData2 = {
        loc: {
            type: 'Point',
            coordinates: [ 2.307980, 48.888205] 
        },
        dateUpdate: moment(),
        active: true
    }
    User.findOneAndUpdate(query2, newData2, {upsert:true}, (err, doc) => {
        if (err) {console.log(err.name + ': ' + err.message) }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    })

    const query3 = {
        username: 'Audrey',
        email: 'audrey@gmail.com',
    }
    const newData3 = {
        loc: {
            type: 'Point',
            coordinates: [2.4078493, 48.9136367] 
        },
        dateUpdate: moment(),
        active: true
    }
    User.findOneAndUpdate(query3, newData3, {upsert:true}, (err, doc) => {
        if (err) {console.log(err.name + ': ' + err.message) }
        // todo: socket.emit saved avec success pour le front
        console.log(doc, "saved with success");
    })
}

module.exports = generateUsers;
