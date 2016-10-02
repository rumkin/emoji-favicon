# Emoji-Favicon

Emoji-favicon is middleware for creating nice emoji favicons. It can be used
with servers like connect or express.

![Build](https://img.shields.io/travis/rumkin/emoji-favicon.svg)

## Installation

Instal via npm:

```bash
$ npm i emoji-favicon
```

## Usage

Middleware has one argument. It should be emoji name. If emoji not found it throws an error.

```javascript
var express = require('express');
var emojiFavicon = require('emoji-favicon');

express().use(emojiFavicon('smiley'));
// ...
```

Works both with express and connect.

## Credentials

Emoji list at [Emoji cheat sheet](http://www.emoji-cheat-sheet.com/).

Based on [emoji-img](http://npmjs.org/package/emoji-img) package.

## License

MIT.
