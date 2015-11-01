'use strict';

var parse = require('./parse');
var _add = require('./_add');

function add(obj, path, data) {
    return _add(obj, parse(path), data);
}

module.exports = add;
