'use strict';

function _ext(obj, src) {
    var i;
    var k;
    var l;
    var keys = Object.keys(src);

    for (i = 0, l = keys.length; i < l; i += 1) {
        k = keys[i];
        obj[k] = src[k];
    }
}

module.exports = _ext;
