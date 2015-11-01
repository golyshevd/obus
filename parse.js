'use strict';

var LRUDict = require('lru-dict');
var _parse = require('./_parse');

/**
 * @returns {Array}
 * */
function parse(path) {
    var parts = [];

    if (typeof path === 'string') {
        if (!parse.cache.peek(path)) {
            parse.cache.set(path, _parse(path));
        }

        parts = parse.cache.get(path);
    }

    return parts;
}

parse.cache = new LRUDict(255);

module.exports = parse;
