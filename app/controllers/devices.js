/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Device = mongoose.model('Device');

/**
 * Create a new device.
 */
exports.create = function (req, res) {
    var device = new Device(req.body);
    device.deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
    var msg = null;

    Device
        .findOne({
            deviceLibraryIdentifier: req.params.deviceLibraryIdentifier
        })
        .exec(function (_err, _device) {
            if (_err) res.json(500);
            if (_device) {
                msg = "Device<" + req.params.deviceLibraryIdentifier + "> already existed.";
                return res.send(400, {error: msg});
            }
            device.save(function (err, device) {
                if (err) return res.json(500, err);
                else {
                    console.log("A new device has been created: " + device.deviceLibraryIdentifier);
                    res.json(200, "Device sucessfully registered. (200)");
                }
            })
        });
};

exports.remove = function (req, res) {

}
