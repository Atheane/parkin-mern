'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  socket.on("EMIT_USERDATA", function (facebookJson) {
    console.log("EMIT_USERDATA", facebookJson);
    if (facebookJson && facebookJson.id) {
      var token = facebookJson.id.toString();
      _user2.default.findOne({ token: token }, function (err, user) {
        if (err) {
          console.log(err.name + ': ' + err.message);
        }
        if (user) {
          console.log(user, "found with success");
          return user;
        } else {
          var newUser = new _user2.default({
            name: facebookJson.name,
            token: facebookJson.id,
            active: true,
            dateInscription: (0, _moment2.default)()
          });
          newUser.save(function (err) {
            if (err) {
              console.log(err.name + ': ' + err.message);
            }
            console.log(newUser, "saved with success");
          });
          return newUser;
        }
      });
    } else {
      console.log({ errorMessage: "USER, no data received from front" }, socket.id);
      return { errorMessage: "USER, no data received from front" };
    }
  });
};