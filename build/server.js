'use strict';

var request = require('request');
var querystring = require('querystring');
var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(3000));
var http = require('http');
var engine = require('ejs-locals');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require("body-parser");
var ejs = require('ejs');
app.use(bodyParser.json());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express['static'](__dirname + '/views'));
app.use(express['static'](__dirname + '/public/javascripts'));

//var instagram = require('./src/instagram')(app, io);
var tweeter = require('./src/twitter')(app, io);
//instagram.requestToInstagram();
tweeter.requestToTwitter();

app.get('/', function (req, res) {
    res.render('main.html');
});
//# sourceMappingURL=server.js.map