/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 14-3-10
 * Time: 下午4:24
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (app) {

    var registrations = require('./app/controllers/registrations');
    app.post('/passes/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', registrations.register);
    app.delete('/passes/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', registrations.withdraw);
    app.get('/passes/:version/devices/:deviceLibraryIdentifier/registrations/:passTypeIdentifier', registrations.getNewSerialNum);
    app.post('/passes/:version/registrations/:passTypeIdentifier/:serialNumber/update', registrations.pushUpdate);

    var passes = require('./app/controllers/passes');
    app.post('/passes', passes.create);
};