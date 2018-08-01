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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var geodist = require('geodist');

var expo = new _expoServerSdk2.default();

exports.default = function (socket) {
  socket.on("movingUserPosition", function (_ref) {
    var userPosition = _ref.userPosition,
        token = _ref.token;

    console.log("movingUserPosition", userPosition);
    if (userPosition && token) {
      _user2.default.findOne({ token: token }, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, user) {
          var pushToken;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  console.log("user", user);
                  if (err) {
                    console.log(err.name + ': ' + err.message);
                  }

                  if (!user) {
                    _context3.next = 9;
                    break;
                  }

                  _context3.next = 5;
                  return user.tokenPushNotification;

                case 5:
                  pushToken = _context3.sent;

                  _spot2.default.findOne({ assignedTo: user }, function (err, spot) {
                    console.log("spot", spot);
                    if (err) {
                      console.log(err.name + ': ' + err.message);
                    }
                    if (spot) {
                      var shouldPushANotification = geodist({ lat: userPosition.latitude, lon: userPosition.longitude }, { lat: spot.loc.coordinates[1], lon: spot.loc.coordinates[0] }, { unit: 'meters', limit: 80 });
                      var counter = 0;
                      if (shouldPushANotification && counter === 0) {
                        console.log(counter);
                        var title = 'Parkin';
                        var body = 'est à moins de 80m';
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
                        // let chunks = expo.chunkPushNotifications(messages);
                        var tickets = [];
                        var pushNotifications = function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var ticketChunk;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return expo.sendPushNotificationsAsync(messages);

                                  case 3:
                                    ticketChunk = _context.sent;

                                    console.log(ticketChunk);
                                    tickets.push.apply(tickets, _toConsumableArray(ticketChunk));
                                    _context.next = 11;
                                    break;

                                  case 8:
                                    _context.prev = 8;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                  case 11:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, undefined, [[0, 8]]);
                          }));

                          return function pushNotifications() {
                            return _ref3.apply(this, arguments);
                          };
                        }();
                        pushNotifications();

                        // sending a notification produces a ticket, which
                        // contains a receipt ID you later use to get the receipt.
                        // The receipts may contain error codes to which you must respond. 
                        var receiptIds = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                          for (var _iterator = tickets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var ticket = _step.value;

                            if (ticket.id) {
                              receiptIds.push(ticket.id);
                            }
                          }
                        } catch (err) {
                          _didIteratorError = true;
                          _iteratorError = err;
                        } finally {
                          try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }
                          } finally {
                            if (_didIteratorError) {
                              throw _iteratorError;
                            }
                          }
                        }

                        var receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                        var retrieveErrors = function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                            var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, chunk, receipts, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, receipt;

                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _iteratorNormalCompletion2 = true;
                                    _didIteratorError2 = false;
                                    _iteratorError2 = undefined;
                                    _context2.prev = 3;
                                    _iterator2 = receiptIdChunks[Symbol.iterator]();

                                  case 5:
                                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                      _context2.next = 49;
                                      break;
                                    }

                                    chunk = _step2.value;
                                    _context2.prev = 7;
                                    _context2.next = 10;
                                    return expo.getPushNotificationReceiptsAsync(chunk);

                                  case 10:
                                    receipts = _context2.sent;

                                    console.log(receipts);

                                    _iteratorNormalCompletion3 = true;
                                    _didIteratorError3 = false;
                                    _iteratorError3 = undefined;
                                    _context2.prev = 15;
                                    _iterator3 = receipts[Symbol.iterator]();

                                  case 17:
                                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                      _context2.next = 27;
                                      break;
                                    }

                                    receipt = _step3.value;

                                    if (!(receipt.status === 'ok')) {
                                      _context2.next = 23;
                                      break;
                                    }

                                    return _context2.abrupt('continue', 24);

                                  case 23:
                                    if (receipt.status === 'error') {
                                      console.error('There was an error sending a notification: ' + receipt.message);
                                      if (receipt.details && receipt.details.error) {
                                        // The error codes are listed in the Expo documentation:
                                        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
                                        // You must handle the errors appropriately.
                                        console.error('The error code is ' + receipt.details.error);
                                      }
                                    }

                                  case 24:
                                    _iteratorNormalCompletion3 = true;
                                    _context2.next = 17;
                                    break;

                                  case 27:
                                    _context2.next = 33;
                                    break;

                                  case 29:
                                    _context2.prev = 29;
                                    _context2.t0 = _context2['catch'](15);
                                    _didIteratorError3 = true;
                                    _iteratorError3 = _context2.t0;

                                  case 33:
                                    _context2.prev = 33;
                                    _context2.prev = 34;

                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                      _iterator3.return();
                                    }

                                  case 36:
                                    _context2.prev = 36;

                                    if (!_didIteratorError3) {
                                      _context2.next = 39;
                                      break;
                                    }

                                    throw _iteratorError3;

                                  case 39:
                                    return _context2.finish(36);

                                  case 40:
                                    return _context2.finish(33);

                                  case 41:
                                    _context2.next = 46;
                                    break;

                                  case 43:
                                    _context2.prev = 43;
                                    _context2.t1 = _context2['catch'](7);

                                    console.error(_context2.t1);

                                  case 46:
                                    _iteratorNormalCompletion2 = true;
                                    _context2.next = 5;
                                    break;

                                  case 49:
                                    _context2.next = 55;
                                    break;

                                  case 51:
                                    _context2.prev = 51;
                                    _context2.t2 = _context2['catch'](3);
                                    _didIteratorError2 = true;
                                    _iteratorError2 = _context2.t2;

                                  case 55:
                                    _context2.prev = 55;
                                    _context2.prev = 56;

                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                      _iterator2.return();
                                    }

                                  case 58:
                                    _context2.prev = 58;

                                    if (!_didIteratorError2) {
                                      _context2.next = 61;
                                      break;
                                    }

                                    throw _iteratorError2;

                                  case 61:
                                    return _context2.finish(58);

                                  case 62:
                                    return _context2.finish(55);

                                  case 63:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, undefined, [[3, 51, 55, 63], [7, 43], [15, 29, 33, 41], [34,, 36, 40], [56,, 58, 62]]);
                          }));

                          return function retrieveErrors() {
                            return _ref4.apply(this, arguments);
                          };
                        }();
                        retrieveErrors();
                      }
                    } else {
                      console.log("onMovingUserPosition, No spot assined to user", user);
                    }
                  });
                  _context3.next = 10;
                  break;

                case 9:
                  console.log("onMovingUserPosition, No user found in DB");

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    } else {
      console.log("onMovingUserPosition, no data received from front", socket.id);
    }
  });
};