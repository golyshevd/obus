'use strict';

var _own = require('./_own');

function _has(obj, path) {
    var i = 0;
    var k = '';
    var l = path.length;

    for (; i < l; i += 1) {
        k = path[i];

        if (_own(obj, k)) {
            obj = obj[k];

            continue;
        }

        return false;
    }

    return true;
}

module.exports = _has;
