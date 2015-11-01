'use strict';

var parse = require('./parse');
var _set = require('./_set');

function set(obj, path, data) {
    return _set(obj, parse(path), data);
}

module.exports = set;
