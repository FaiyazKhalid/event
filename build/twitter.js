'use strict';

var request = require('request');
module.exports = function (app, io) {
    var module = {};
    var Twitter = require('twitter');
    var twitter = new Twitter({
        consumer_key: 'a9PsuOmuyeeL0oIdm7MKB7GSO',
        consumer_secret: 'vyQiD2KTJUCc45Ql9ThHZeWgGmre2LLvBL5ge2ugyd5xgQJaZ5',
        access_token_key: '2846507980-Zr7VD15zQIeiVzAko2uS4ngzlROveSMgokLlyBw',
        access_token_secret: 'YZn8LiDxZ9DkHMpne5wxUPHJ9COpTnTZc6JLTSfxYuOys'
    });

    app.get('/twitter/callback', function (req, res) {
        console.log(req);
        console.log(res);
    });

    app.post('/twitter/callback', function (req, res) {
        console.log(req);
        console.log(res);
    });

    module.requestToTwitter = function () {
        twitter.stream('statuses/filter', { track: 'nofilter' }, function (stream) {
            stream.on('data', function (tweet) {
                io.sockets.emit('tweet-img', body);
            });

            stream.on('error', function (error) {
                io.sockets.emit('tweet-img-error', error);
            });
        });
    };
    return module;
};
//# sourceMappingURL=twitter.js.map