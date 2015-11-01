'use strict';

var parse = require('./parse');
var _has = require('./_has');

function has(obj, path) {
    return _has(obj, parse(path));
}

module.exports = has;
