/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 14-3-10
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Pass Schema
 */
var PassSchema = new Schema({
    passTypeIdentifier: String,
    serialNumber: String,
    version: String,
    updateDate: {type: Date, default: Date.now}
});

var Pass = mongoose.model('Pass', PassSchema);
