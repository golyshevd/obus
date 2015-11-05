'use strict';

var toSingleQuotes = require('to-single-quotes');

var R_IDENT = /^[_a-z$][\w$]*$/i;

function _format(part) {
    if (typeof part === 'number') {
        return '[' + part + ']';
    }

    if (R_IDENT.test(part)) {
        return '.' + part;
    }

    return '[' + toSingleQuotes('"' + part + '"') + ']';
}

module.exports = _format;

