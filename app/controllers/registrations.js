/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    passes = require('./passes'),
    devices = require('./devices'),
    Pass = mongoose.model('Pass'),
    Device = mongoose.model('Device'),
    Registration = mongoose.model('Registration');

/**
 * Register a new device to a pass.
 */
exports.register = function (req, res) {
    var msg = null;
    console.log("Requesting pass registration...");
    console.log("Info: Device<" + req.params.deviceLibraryIdentifier + "> PassType<" + req.params.passTypeIdentifier
        + "> Serial Number<" + req.params.serialNumber + ">");

    //TODO Authorization
    if (req.get('Authorization') != "ApplePass vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc") {
        return res.json(401, "Error: Token is not authorized! (401)");
    }

    //Register for a new device
    devices.create(req, res);

    //Check if the pass is in the library
    passes.findPass(req, res, function (_err) {
        if (_err) return res.json(_err);

        Registration
            .findOne({
                serialNumber: req.params.serialNumber,
                deviceLibraryIdentifier: req.params.deviceLibraryIdentifier
            })
            .exec(function (_err, _reg) {
                if (_err) res.json(500);
                if (_reg) {
                    msg = "The device<" + req.params.deviceLibraryIdentifier
                        + "> has already been registered for this pass. (201)";
                    console.log(msg);
                    return res.json(201, msg);
                }
                var registration = new Registration({
                    passTypeIdentifier: req.params.passTypeIdentifier,
                    serialNumber: req.params.serialNumber,
                    deviceLibraryIdentifier: req.params.deviceLibraryIdentifier
                });
                registration.save(function (err) {
                    if (err) return res.json(500, err);
                    else {
                        msg = "Registration is successful. (200)";
                        console.log(msg);
                        return res.json(200, msg);
                    }
                })
            });
    });
};

/**
 * Unregister a device from the pass library.
 */
exports.unRegister = function (req, res) {
    var msg = null;
    console.log("Requesting un-registration from the pass library...");
    console.log("Info: Device<" + req.params.deviceLibraryIdentifier + "> PassType<" + req.params.passTypeIdentifier
        + "> Serial Number<" + req.params.serialNumber + ">");

    //TODO Authorization
    if (req.get('Authorization') != "ApplePass vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc") {
        return res.json(401, "Error: Token is not authorized! (401)");
    }

    Registration
        .findOne({
            serialNumber: req.params.serialNumber,
            deviceLibraryIdentifier: req.params.deviceLibraryIdentifier
        })
        .exec(function (_err, _reg) {
            if (_err) res.json(500);
            if (!_reg) {
                msg = "Attempt to access a registration info not existed. (404)";
                console.log(msg);
                return res.send(404, {error: msg});
            }
            _reg.remove(function (err, reg) {
                if (err) return res.json(500);
                console.log("Registration info successfully destroyed. (200)");
                return res.json(reg);
            })
        })
}