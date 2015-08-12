var request = require('request');
var querystring = require('querystring');
var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(3000));
var http = require('http');
var InstagramStream = require('instagram-realtime');
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var data = {
    client_id: "73cec7670f2e427a9de45a33ef5c01bf",
    client_secret: "addaf928b6134a4a8eb549bb8f49b302",
    callback_url: "https://590badf2.ngrok.io/callback",
    aspect: "media",
    object: "tag",
    object_id: "nofilter"
};

var authParams = {
    client_id: "73cec7670f2e427a9de45a33ef5c01bf",
    redirect_uri: "/auth",
    response_type: "INSTAGRAM"
};

request.post({url: "https://api.instagram.com/v1/subscriptions", form: data},
    function(err, response, body) {
        if (err){
            console.log("Failed to subscribe:", err);
        } else {
            console.log("Successfully subscribed.");
        }
    });

app.get('/', function (req, res) {

    res.send('Hello World!');
});

app.get('/callback', function(req, res){
    res.end(req["query"]['hub.challenge']);
});

app.post('/callback', function(req, res){
    request.get({url: "https://api.instagram.com/v1/tags/"+req.body[0]["object_id"]+"/media/recent?client_id=73cec7670f2e427a9de45a33ef5c01bf", form: data},
        function(err, response, body) {
            if (err){
                console.log("Failed to subscribe:", err);
            } else {
                for(obj in JSON.parse(body)){
                    io.on('connection', function(socket){
                        socket.emit('newpost', JSON.parse(obj));
                    });
                    if(typeof obj != 'string') {
                        console.log(obj);
                    }
                }
            }
        });
});
