'use strict';

const assert = require('assert');
const http = require('http');
const connect = require('connect');
const fs = require('fs');
const emojiFavicon = require('..');

describe('Emoji-favicon', function() {
    var server;

    before(function(){
        server = connect()
            .use(emojiFavicon('smiley'))
            .listen();
    });

    it('Should send valid emoji', function(done) {
        var url = 'http://localhost:' + server.address().port + '/favicon.ico';

        http.get(url, function (res) {
            try {
                assert.equal(res.statusCode, 200, 'Status code is 200');
            } catch (err) {
                done(err);
                return;
            }

            res.on('error', done);

            var result = new Buffer(parseInt(res.headers['content-length']));
            var offset = 0;

            res.on('data', function (chunk) {
                chunk.copy(result, offset);
                offset += chunk.length;
            });

            res.on('end', function() {
                try {
                    var file = fs.readFileSync(__dirname + '/../node_modules/emoji-img/emojis/smiley.png');

                    assert.ok(result.equals(file), 'Images are equal');
                } catch (err) {
                    done(err);
                    return;
                }
                done();
            });

        });
    });

    it('Should throw if emoji not found', function() {
        assert.throws(function() {
            emojiFavicon('hahaha$');
        }, /hahaha\$/, 'Throws an error');
    });
});
