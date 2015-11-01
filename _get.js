'use strict';

var _own = require('./_own');

function _get(obj, path) {
    var i;
    var k;
    var l;

    for (i = 0, l = path.length; i < l; i += 1) {
        k = path[i];

        if (_own(obj, k)) {
            obj = obj[k];
            continue;
        }

        return undefined;
    }

    return obj;
}

module.exports = _get;
