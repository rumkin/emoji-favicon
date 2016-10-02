'use strict';

var fs = require('fs');
var path = require('path');

var emojiDir = path.resolve(path.join(__dirname, '..', 'node_modules', 'emoji-images'));
if (! fs.existsSync(emojiDir)) {
    throw new Error('Emoji favicon: emoji-images package not found.');
}

module.exports = factory;
module.exports.load = load;
module.exports.list = list;
module.exports.find = find;
module.exports.resolve = resolve;

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
    var filepath = resolve(emoji + '');
    return {
        stat: fs.statSync(filepath),
        data: fs.readFileSync(filepath),
    };
}

/**
 * List available images from emoji-images package
 * @returns {Array}
 */
function list () {
    var dir = path.join(emojiDir, 'pngs');
    return fs.readdirSync(dir)
    .filter(function(file){
        return path.extname(file) === '.png';
    }).map(function(file){
       return file.slice(0, -4);
    });
}

/**
 * Resolve emoji path
 * @param {string} emoji Emoji name or alias
 * @returns {string}
 */
function resolve (emoji) {
    var emojiPath = emojiDir + '/pngs/' + emoji + '.png';
    if (! fs.existsSync(emojiPath)) {
        throw new Error('Emoji "' + emoji + '" not found at ' + emojiPath);
    }

    return emojiPath;
}

/**
 * Search emoji by name alias. Return `null` if not found.
 * @param {string} emoji Emoji name or alias
 * @returns {string|null}
 */
function find (emoji) {
    var pathName = emojiDir + '/pngs/' + emoji + '.png';
    return fs.existsSync(pathName) ? pathName : null;
}