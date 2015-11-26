'use strict';

var LRUDict = require('lru-dict');
var _parse = require('./_parse');

/**
 * @returns {Array}
 * */
function parse(path) {
    var parts = parse.cache.get(path);

    if (!parts) {
        parts = _parse(path);
        parse.cache.set(path, parts);
    }

    return parts;
}

parse.cache = new LRUDict(255);

module.exports = parse;
