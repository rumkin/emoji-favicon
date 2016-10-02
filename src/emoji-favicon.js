'use strict';

const fs = require('fs');
const emojis = require('emoji-img');

module.exports = factory;
module.exports.load = load;

function factory (emoji) {
    var result = load(emoji);

    return function(req, res, next) {
        if (req.url !== '/favicon.ico') {
            next();
            return;
        }

        res.setHeader('content-type', 'image/png');
        res.setHeader('content-length', result.stat.size);
        res.writeHead(200, 'OK');
        res.end(result.data);
    };
}

/**
 * Load emoji image file by empji name
 * @param {string} emoji Emoji name or alias
 * @returns {Stream}
 */
function load (emoji) {
    if (! emojis.has(emoji)) {
        throw new Error('Emoji Error: emoji "' + emoji + '" not found');
    }

    var filepath = emojis.get(emoji);
    return {
        stat: fs.statSync(filepath),
        data: fs.readFileSync(filepath),
    };
}
