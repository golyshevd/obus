/*eslint complexity: 0*/
'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var parse = require('./parse');

function add(obj, path, data) {
    var i;
    var k;
    var l;
    var parts = parse(path);

    if (!parts.length) {
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

    if (hasProperty.call(obj, k) && obj[k] &&
        (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
        obj = obj[k];
        for (i in data) {
            if (hasProperty.call(data, i)) {
                obj[i] = data[i];
            }
        }

        return obj;
    }

    obj[k] = data;

    return obj[k];
}

module.exports = add;
