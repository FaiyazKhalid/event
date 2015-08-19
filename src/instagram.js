var request = require('request');

module.exports = function(app, io){
    var module = {};
    app.get('/callback', function(req, res){
        res.end(req["query"]['hub.challenge']);
    });

    app.post('/callback', function(req, res){
        res.json({success: true, kind: req.body[0].object});
        request.get({url: "https://api.instagram.com/v1/tags/"+req.body[0]["object_id"]+"/media/recent?client_id=73cec7670f2e427a9de45a33ef5c01bf", form: data},
            function(err, response, body) {
                if(response && response.statusCode == 200) {
                    console.log("POST");
                    io.sockets.emit('img', body);
                }
            });
        res.end();
    });
    module.requestToInstagram = function() {
        request.post({url: "https://api.instagram.com/v1/subscriptions", form: data},
            function (err, response, body) {
                if (err) {
                    console.log("Failed to subscribe:", err);
                } else {
                    console.log(body);
                    console.log("Successfully subscribed.");
                }
            });
    }
        return module;
};
var data = {
    client_id: "73cec7670f2e427a9de45a33ef5c01bf",
    client_secret: "addaf928b6134a4a8eb549bb8f49b302",
    callback_url: "http://cfa613ea.ngrok.io/callback",
    aspect: "media",
    object: "tag",
    object_id: "nofilter"
};

var authParams = {
    client_id: "73cec7670f2e427a9de45a33ef5c01bf",
    redirect_uri: "/auth",
    response_type: "INSTAGRAM"
};

