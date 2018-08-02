'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  { 
    loc: { type: {type: String, default: 'Point'}, coordinates:  {type: [Number], default: [0, 0]} },
    name: {type: String, min: 3, max: 100, unique: true},
    token: {type: String, min: 3, max: 100, unique: true},
    pushToken: {type: String, min: 3, max: 100},
    assignedSpot: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spot',
      unique: true
    }],
    active: {type: Boolean},
    dateInscription: {type: Date},
    dateUpdate: {type: Date},
  }, { collection: "users" }
)
UserSchema.index({ loc: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);

