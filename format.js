'use strict';

var _format = require('./_format');

function format(parts) {
    var l = parts.length;
    var path = new Array(l);

    while (l) {
        l -= 1;
        path[l] = _format(parts[l]);
    }

    return path.join('');
}

module.exports = format;
