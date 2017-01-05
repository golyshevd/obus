'use strict';

var _get = require('./_get');
var parse = require('./parse');

function get(obj, path, def) {
    obj = _get(obj, parse(path));

    if (typeof obj === 'undefined') {
        return def;
    }

    return obj;
}

module.exports = get;
