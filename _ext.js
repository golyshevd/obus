'use strict';

function _ext(obj, src) {
    var i = 0;
    var k = '';
    var keys = Object.keys(src);
    var l = keys.length;

    for (; i < l; i += 1) {
        k = keys[i];
        obj[k] = src[k];
    }
}

module.exports = _ext;
