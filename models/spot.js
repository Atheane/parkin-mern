'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SpotSchema = new Schema(
  { 
    coords: { 
        latitude: { type: Number, required: true }, 
        longitude: { type: Number, required: true }
    },
    name: {type: String, min: 3, max: 100},
    dateInscription: {type: Date},
  }, { collection: 'spots' }
)

module.exports = mongoose.model('Spot', SpotSchema);

