var request = require('request');

module.exports = function(app, io, clientID, secretID, domain, tag){
    var module = {};

    var data = {
        client_id: clientID,
        client_secret: secretID,
        callback_url: "http://"+ domain +"/node/instagram_callback",
        aspect: "media",
        object: "tag",
        object_id: tag
    };

    app.get('/node/instagram_callback', function(req, res){
        res.end(req["query"]['hub.challenge']);
    });

    app.post('/node/instagram_callback', function(req, res){
        res.json({success: true, kind: req.body[0].object});
        request.get({url: "https://api.instagram.com/v1/tags/"+req.body[0]["object_id"]+"/media/recent?client_id="+clientID, form: data},
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



