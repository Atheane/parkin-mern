"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on("tokenPushNotification", function (_ref) {
    var pushToken = _ref.pushToken,
        token = _ref.token;

    console.log("listen on tokenPushNotification");
    console.log(Date.now());
    console.log(pushToken);
    if (pushToken && token) {
      // to-do automatate with data from front rather than fake data 
      _user2.default.findOneAndUpdate({ token: token }, { pushToken: pushToken }, { upsert: true }, function (err, doc) {
        if (err) {
          console.log(err.name + ': ' + err.message);
        }
        console.log(doc, "updated with success");
      });
    } else {
      console.log("on tokenPushNotification, no token was not received from front", socket.id);
    }
  });
};