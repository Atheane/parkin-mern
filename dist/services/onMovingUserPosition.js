'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expoServerSdk = require('expo-server-sdk');

var _expoServerSdk2 = _interopRequireDefault(_expoServerSdk);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _spot = require('../models/spot');

var _spot2 = _interopRequireDefault(_spot);

var _currentUser = require('../constants/currentUser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var geodist = require('geodist');

var expo = new _expoServerSdk2.default();

exports.default = function (socket) {
  _user2.default.findOne({ email: _currentUser.email }, function (err, user) {
    console.log("user", user);
    if (err) {
      console.log(err.name + ': ' + err.message);
    }
    var pushToken = user.tokenPushNotification;
    _spot2.default.findOne({ assignedTo: user }, function (err, spot) {
      console.log("spot", spot);
      if (err) {
        console.log(err.name + ': ' + err.message);
      }
      if (spot) {
        socket.on("movingUserPosition", function (userPosition) {
          console.log("movingUserPosition", userPosition);
          if (userPosition) {
            var shouldPushANotification = geodist({ lat: userPosition.latitude, lon: userPosition.longitude }, { lat: spot.loc.coordinates[1], lon: spot.loc.coordinates[0] }, { unit: 'meters', limit: 100 });
            if (shouldPushANotification) {
              var title = 'Parkin';
              var body = 'Vous êtes arrivé';
              var message = {
                to: pushToken,
                sound: 'default',
                title: title,
                body: body,
                data: { message: title + ' - ' + body }
              };
              socket.emit("spotNearMe", message);
              if (!_expoServerSdk2.default.isExpoPushToken(pushToken)) {
                console.error('Push token ' + pushToken + ' is not a valid Expo push token');
              }
              var messages = [];
              messages.push(message);
              var chunks = expo.chunkPushNotifications(messages);
              var tickets = [];
              var pushNotifications = function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, ticketChunk;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          // Send the chunks to the Expo push notification service. There are
                          // different strategies you could use. A simple one is to send one chunk at a
                          // time, which nicely spreads the load out over time:
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context.prev = 3;
                          _iterator = chunks[Symbol.iterator]();

                        case 5:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 21;
                            break;
                          }

                          chunk = _step.value;
                          _context.prev = 7;
                          _context.next = 10;
                          return expo.sendPushNotificationsAsync(chunk);

                        case 10:
                          ticketChunk = _context.sent;

                          console.log(ticketChunk);
                          tickets.push.apply(tickets, _toConsumableArray(ticketChunk));
                          // NOTE: If a ticket contains an error code in ticket.details.error, you
                          // must handle it appropriately. The error codes are listed in the Expo
                          // documentation:
                          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
                          _context.next = 18;
                          break;

                        case 15:
                          _context.prev = 15;
                          _context.t0 = _context['catch'](7);

                          console.error(_context.t0);

                        case 18:
                          _iteratorNormalCompletion = true;
                          _context.next = 5;
                          break;

                        case 21:
                          _context.next = 27;
                          break;

                        case 23:
                          _context.prev = 23;
                          _context.t1 = _context['catch'](3);
                          _didIteratorError = true;
                          _iteratorError = _context.t1;

                        case 27:
                          _context.prev = 27;
                          _context.prev = 28;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 30:
                          _context.prev = 30;

                          if (!_didIteratorError) {
                            _context.next = 33;
                            break;
                          }

                          throw _iteratorError;

                        case 33:
                          return _context.finish(30);

                        case 34:
                          return _context.finish(27);

                        case 35:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
                }));

                return function pushNotifications() {
                  return _ref.apply(this, arguments);
                };
              }();
              pushNotifications();
            }
          } else {
            console.log("onMovingUserPosition, no data received from front", socket.id);
          }
        });
      }
    });
  });
};