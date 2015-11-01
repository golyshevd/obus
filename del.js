'use strict';

var parse = require('./parse');
var _del = require('./_del');

function del(obj, path) {
    return _del(obj, parse(path));
}

module.exports = del;
