"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on("tokenPushNotification", function (tokenPushNotification) {
    console.log("listen on tokenPushNotification");
    console.log(Date.now());
    console.log(tokenPushNotification);
    if (tokenPushNotification) {
      // to-do automatate with data from front rather than fake data 
      var email = 'eroyant@gmail.com';
      _user2.default.findOneAndUpdate({ email: email }, { tokenPushNotification: tokenPushNotification }, { upsert: true }, function (err, doc) {
        if (err) {
          console.log(err.name + ': ' + err.message);
        }
        console.log(doc, "updated with success");
      });
    } else {
      console.log("tokenPushNotification was not received from front");
    }
  });
};