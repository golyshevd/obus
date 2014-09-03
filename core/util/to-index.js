'use strict';

var N_MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;
var R_EMPTY = /^\s*$/;
var R_OCTAL = /^[-+]?0[0-7]+\s*$/;
var R_SIGNED = /^\s*([-+])\s*/;

var _ = require('lodash-node');

function toIndex(s) {

    //  empty / float
    if (R_EMPTY.test(s) || s.indexOf('.') > -1) {

        return NaN;
    }

    //  remove spaces between sign and number
    s = s.replace(R_SIGNED, '$1');

    if (R_OCTAL.test(s)) {

        //  octal
        s = _.parseInt(s, 8);
    } else {

        //  decimal / hexadecimal
        s = _.parseInt(s);
    }

    if (_.isNaN(s)) {

        return s;
    }

    if (s >= N_MAX_ARRAY_LENGTH) {

        return NaN;
    }

    return s;
}

module.exports = toIndex;
