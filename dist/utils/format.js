"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var formatSpot = exports.formatSpot = function formatSpot(spot) {
    return {
        name: spot.name,
        coords: {
            latitude: spot.loc.coordinates[1],
            longitude: spot.loc.coordinates[0]
        }
    };
};