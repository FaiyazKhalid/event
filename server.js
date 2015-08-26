var request = require('request');
var cluster = require('cluster');
var querystring = require('querystring');
var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(5000));
var http = require('http');
var engine = require('ejs-locals');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require("body-parser");
var ejs = require('ejs');
app.use(bodyParser.json());
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/javascripts'));


//var tweeter = require('./src/twitter')(app, io);

app.get('/', function (req, res) {
    res.render('main.html');
    res.end();
});

app.get('/node', function (req, res) {
    res.render('main.html');
    res.end();
});


app.post('/node/server_configuration', function(req, res){
    var params = res['req']['body'];
    console.log(params);
    var instagram = require('./src/instagram')(app, io, params["instagram_client_id"], params["instagram_client_secret"], params["domain"], params["tags"]);
    instagram.requestToInstagram();
    //tweeter.requestToTwitter();
    res.end();
});

app.post('/node/stop_stream', function(req, res){
    var params = res['req']['body'];
    var instagram = require('./src/instagram')(app, io, params["instagram_client_id"], params["instagram_client_secret"], params["domain"], params["tags"][0]);
    instagram.deleteSubscription();
    res.end();
});
