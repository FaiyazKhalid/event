var request = require('request');

module.exports = function(app, io, clientID, secretID, domain, tags){
    var module = {};

    var data = {
        client_id: clientID,
        client_secret: secretID,
        callback_url: "http://"+ domain +"/node/instagram_callback",
        aspect: "media",
        object: "tag"
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
        for(var i = 0; i < tags.length; i++) {
            data["object_id"] = tags[i];
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
    }

    module.deleteSubscription = function(){
        data["object"] = "all";
        request.del("https://api.instagram.com/v1/subscriptions?object=all&client_id="+data["client_id"]+"&client_secret="+data["client_secret"],
            function (err, response, body) {
                if (err) {
                    console.log("Failed to unsubscribe:", err);
                } else {
                    console.log(body);
                    console.log("Successfully remove subscription.");
                }
            });
    }

        return module;
};



