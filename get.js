'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var parse = require('./parse');

function get(obj, path, def) {
    var i;
    var k;
    var l;
    var parts = parse(path);

    for (i = 0, l = parts.length; i < l; i += 1) {
        k = parts[i];

        if (obj && (typeof obj === 'object' || typeof obj === 'function') && hasProperty.call(obj, k)) {
            obj = obj[k];

            continue;
        }

        return def;
    }

    if (obj === void 0) {

        return def;
    }

    return obj;
}

module.exports = get;
