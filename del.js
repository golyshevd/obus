'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var parse = require('./parse');

function del(obj, path) {
    var i;
    var k;
    var l;
    var parts = parse(path);

    if (!parts.length) {
        return false;
    }

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (obj && hasProperty.call(obj, k) && obj[k] &&
            (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
            obj = obj[k];

            continue;
        }

        return false;
    }

    return delete obj[parts[l]];
}

module.exports = del;
