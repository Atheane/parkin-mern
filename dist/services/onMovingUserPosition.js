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

var _geodist = require('geodist');

var _geodist2 = _interopRequireDefault(_geodist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var expo = new _expoServerSdk2.default();
var firstSpot = void 0;

exports.default = function (socket) {
  socket.on("EMIT_MOVINGUSERPOSITION", function (_ref) {
    var userPosition = _ref.userPosition,
        token = _ref.token;

    console.log("EMIT_MOVINGUSERPOSITION", userPosition);
    if (userPosition && token) {
      _user2.default.findOne({ token: token }, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, user) {
          var pushToken;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log("user", user);
                  if (err) {
                    console.log(err.name + ': ' + err.message);
                  }

                  if (!user) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 5;
                  return user.tokenPushNotification;

                case 5:
                  pushToken = _context.sent;

                  _spot2.default.findOne({ assignedTo: user }, function (err, spot) {
                    console.log("spot", spot);
                    if (err) {
                      console.log(err.name + ': ' + err.message);
                    }
                    if (spot) {
                      var shouldPushANotification = (0, _geodist2.default)({ lat: userPosition.latitude, lon: userPosition.longitude }, { lat: spot.loc.coordinates[1], lon: spot.loc.coordinates[0] }, { unit: 'meters', limit: 80 });
                      var counter = 0;
                      if (shouldPushANotification && counter === 0) {
                        counter += 1;
                        console.log(counter);
                        var title = 'Parkin';
                        var body = 'êtes vous garé sur la place ?';
                        socket.emit("ON_ARRIVAL", {
                          to: pushToken,
                          sound: 'default',
                          title: title,
                          body: body,
                          coord: spot.loc.coordinates,
                          data: { message: title + ' - ' + body }
                        });
                      }
                      //   if (!pushToken && !Expo.isExpoPushToken(pushToken)) {
                      //     console.error(`Push token ${pushToken} is not a valid Expo push token`)
                      //   }
                      //   let messages = []
                      //   messages.push(message)
                      //   // let chunks = expo.chunkPushNotifications(messages);
                      //   let tickets = []
                      //   const pushNotifications = async () => {
                      //     try {
                      //       let ticketChunk = await expo.sendPushNotificationsAsync(messages);
                      //       console.log(ticketChunk)
                      //       tickets.push(...ticketChunk)
                      //     } catch (error) {
                      //       console.error(error)
                      //     }

                      //   }
                      //   pushNotifications()

                      //   // sending a notification produces a ticket, which
                      //   // contains a receipt ID you later use to get the receipt.
                      //   // The receipts may contain error codes to which you must respond. 
                      //   let receiptIds = [];
                      //   for (let ticket of tickets) {
                      //     if (ticket.id) {
                      //       receiptIds.push(ticket.id);
                      //     }
                      //   }

                      //   let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                      //   const retrieveErrors = async () => {
                      //     for (let chunk of receiptIdChunks) {
                      //       try {
                      //         let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                      //         console.log(receipts);

                      //         for (let receipt of receipts) {
                      //           if (receipt.status === 'ok') {
                      //             continue;
                      //           } else if (receipt.status === 'error') {
                      //             console.error(`There was an error sending a notification: ${receipt.message}`);
                      //             if (receipt.details && receipt.details.error) {
                      //               // The error codes are listed in the Expo documentation:
                      //               // https://docs.expo.io/versions/latest/guides/push-notifications#response-format 
                      //               // You must handle the errors appropriately.
                      //               console.error(`The error code is ${receipt.details.error}`);
                      //             }
                      //           }
                      //         }
                      //       } catch (error) {
                      //         console.error(error);
                      //       }
                      //     }
                      //   }
                      // retrieveErrors()
                      // }
                    } else {
                      console.log("on EMIT_MOVINGUSERPOSITION, No spot assined to user", user);
                    }
                  });
                  _context.next = 10;
                  break;

                case 9:
                  console.log("on EMIT_MOVINGUSERPOSITION, No user found in DB");

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    } else {
      console.log("on EMIT_MOVINGUSERPOSITION, no data received from front", socket.id);
    }
  });
};