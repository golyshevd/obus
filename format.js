'use strict';

var toSingleQuotes = require('to-single-quotes');

var R_IDENT = /^[_a-z$][\w$]*$/i;

function format(parts) {
    var l = parts.length;
    var path = new Array(l);
    var part = '';

    while (l) {
        l -= 1;
        part = parts[l];

        if (typeof part === 'number') {
            part = '[' + part + ']';
        } else if (R_IDENT.test(part)) {
            part = '.' + part;
        } else {
            part = '[' + toSingleQuotes('"' + part + '"') + ']';
        }

        path[l] = part;
    }

    return path.join('');
}

module.exports = format;
