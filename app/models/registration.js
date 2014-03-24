/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 14-3-11
 * Time: 上午12:59
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Registration Schema
 */
var RegistrationSchema = new Schema({
    passTypeIdentifier: String,
    serialNumber: String,
    deviceLibraryIdentifier: String
});

RegistrationSchema.statics.findAllPasses = function (deviceId, cb) {
    this.find({deviceLibraryIdentifier: deviceId}).select('passTypeIdentifier serialNumber').exec(cb);
}

var Registration = mongoose.model('Registration', RegistrationSchema);