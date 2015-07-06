/*eslint complexity: 0*/
'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var parse = require('./parse');

function set(obj, path, data) {
    var i;
    var k;
    var l;
    var parts = parse(path);

    if (!parts.length) {
        for (i in obj) {
            if (hasProperty.call(obj, i)) {
                delete obj[i];
            }
        }

        for (i in data) {
            if (hasProperty.call(data, i)) {
                obj[i] = data[i];
            }
        }

        return obj;
    }

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (obj && hasProperty.call(obj, k) && obj[k] &&
            (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
            obj = obj[k];

            continue;
        }

        obj = obj[k] = {};
    }

    k = parts[l];
    obj[k] = data;

    return obj[k];
}

module.exports = set;
