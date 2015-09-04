var request = require('request');
module.exports = function(app, io, domain, tags, consumer_key, consumer_secret, access_token_key, access_token_secret){
    var module = {};
    var Twitter = require('twitter');
    var twitter = new Twitter({
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        access_token_key: access_token_key,
        access_token_secret: access_token_secret
    });

    app.get('/node/twitter_callback', function(req, res){
        console.log(req);
        console.log(res);
    });

    app.post('/node/twitter_callback', function(req, res){
        console.log(req);
        console.log(res);
    });

    module.requestToTwitter = function(){
        for(var tag in tags){
            twitter.stream('statuses/filter', {track: tag}, function(stream) {
                stream.on('data', function(tweet) {
                    io.sockets.emit('tweet-img', body);
                });

                stream.on('error', function(error) {
                    io.sockets.emit('tweet-img-error', error);
                });
            });
        }

    };
    return module;
};