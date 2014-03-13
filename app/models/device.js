/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 14-3-11
 * Time: 上午12:33
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Device Schema
 */
var DeviceSchema = new Schema({
    deviceLibraryIdentifier: String,
    pushToken: String
});

var Device = mongoose.model('Device', DeviceSchema);