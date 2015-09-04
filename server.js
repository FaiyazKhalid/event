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
var workerNumber = 1;

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
    //if(cluster.isMaster) {
    //    var new_worker_env = {};
    //    new_worker_env["WORKER_NAME"] = "worker" + workerNumber;
    //    var worker = cluster.fork(new_worker_env);
    //    workerNumber++;
    //}
    //cluster.on('death', function(worker) {
    //    console.log('worker ' + worker.pid + ' died');
    //    cluster.fork();
    //});
    //
    //cluster.on('exit', function(worker, code, signal){
    //    console.log("cluster exited");
    //});
    //
    //cluster.on('error', function(cluster, error){
    //    console.log(error);
    //});
    //
    //worker.on('error', function(worker, error){
    //    console.log(error);
    //});

    var instagram = require('./src/instagram')(app, io, params["instagram_client_id"], params["instagram_client_secret"], params["domain"], params["tags"]);
    var twitter = require('./src/twitter')(app, io, params["domain"], params["tags"], params["twitter_consumer_key"], params["twitter_consumer_secret"], params["twitter_oauth_token"], params["twitter_oauth_secret"]);
    //instagram.requestToInstagram();
    twitter.requestToTwitter();
    res.end();
});

app.post('/node/stop_stream', function(req, res){
    var params = res['req']['body'];
    var instagram = require('./src/instagram')(app, io, params["instagram_client_id"], params["instagram_client_secret"], params["domain"], params["tags"]);
    instagram.deleteSubscription();
    res.end();
});
