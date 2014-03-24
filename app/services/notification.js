/**
 * Module dependencies.
 */
var apn = require('apn');

/**
 * Initialization.
 */
var options = {
    gateway: "gateway.push.apple.com",
    port: 2195,
    cert: "../../config/certificates/apn/cert.pem",
    key: "../../config/certificates/apn/key.pem"
};
var apnConnection = new apn.Connection(options);
apnConnection.on('connected', function () {
    console.log("APN service is connected.");
});
apnConnection.on('timeout', function () {
    console.log("APN service fail to connect: timeout.");
});
apnConnection.on('socketError', console.error);

/**
 * Listen to the feedback from the devices
 */
var feedbackOptions = {
    "batchFeedback": true,
    "interval": 300
};
var feedback = new apn.Feedback(feedbackOptions);
feedback.on("feedback", function (devices) {
//    devices.forEach(function(item) {
//
//    });
    console.log("hitttt");
});

/**
 * Trigger a push notification to Apple.
 */
exports.push = function (token) {
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600;
    note.payload = {
        aps: ""
    };

    var device = new apn.Device(token);
    apnConnection.pushNotification(note, device);
}
