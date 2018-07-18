'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SpotSchema = new Schema(
  { 
    loc: { type: {type: String, default: 'Point'}, coordinates:  {type: [Number], default: [0, 0]} },
    name: {type: String, min: 3, max: 100},
  }, { collection: "spots" }
)
SpotSchema.index({ loc: "2dsphere" });

module.exports = mongoose.model("Spot", SpotSchema);

