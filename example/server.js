'use strict';

var emojiFavicon = require('../src/emoji-favicon.js');

var port = process.argv[2] || process.env.npm_package_config_port || 8080;
var emoji = process.argv[3]|| process.env.npm_package_config_emoji || 'thumbsup';

var connect = require('connect');

connect()
    .use(emojiFavicon(emoji))
    .use(function(req, res){
        res.writeHead(200, 'OK');
        res.end('<html><head></head><body><h1>Emoji favicon</h1><p></p></body></html>');
    })
    .listen(port);

console.log('Server is started at http://localhost:%s/', port);
