/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Pass = mongoose.model('Pass');

/**
 * Create a new pass.
 */
exports.create = function (req, res) {
    var pass = new Pass(req.body);
    var msg = null;

    Pass
        .findOne({
            passTypeIdentifier: req.body.passTypeIdentifier,
            serialNumber: req.body.serialNumber
        })
        .exec(function (_err, _pass) {
            if (_err) return res.json(500);
            if (_pass) {
                msg = "The pass already exists. (400)";
                return res.send(400, {error: msg});
            }
            pass.save(function (_err) {
                if (_err) return res.send(400, {error: _err});
                else {
                    msg = "A new pass has been created. (200)";
                    console.log(msg);
                    return res.json(200, msg);
                }
            })
        })

};

/**
 * Update a pass info and send a push notification to the devices.
 */
exports.update = function (req, res) {
    //TODO update the pass info

}

/**
 * Find a pass by its pass type identifier and its serial number.
 */
exports.findPass = function (req, res, next) {
    var msg = null;
    Pass
        .findOne({
            passTypeIdentifier: req.params.passTypeIdentifier,
            serialNumber: req.params.serialNumber
        })
        .exec(function (_err, _pass) {
            if (_err) return next(_err);
            if (!_pass) {
                msg = "Pass(Type ID: " + req.params.passTypeIdentifier + ", Serial Number: " +
                    req.params.serialNumber + ") does not exist. (404)";
                return next(new Error(msg));
            }
            req.pass = _pass;
            next();
        });
};




