/**
 * Created with JetBrains WebStorm.
 * User: Tony_Zhang
 * Date: 14-3-9
 * Time: 下午5:04
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('pass-key.pem', 'utf8');
var certificate = fs.readFileSync('pass-cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/pass-server');
//Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function (path) {
    fs.readdirSync(path).forEach(function (file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

var apn = require('apn');
var options = {"gateway": "gateway.push.apple.com"};
var apnConnection = new apn.Connection(options);

var app = express();

app.use(express.bodyParser());

require("./routes")(app);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(8000);
console.log("http server listens on port 3000");


