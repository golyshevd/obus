'use strict';

var _obj = require('./_obj');
var _own = require('./_own');

function _set(obj, path, data) {
    var i = 0;
    var k = '';
    var l = path.length - 1;

    for (; i < l; i += 1) {
        k = path[i];

        if (_own(obj, k) && _obj(obj[k])) {
            obj = obj[k];

            continue;
        }

        obj = obj[k] = {};
    }

    k = path[l];
    obj[k] = data;

    return obj[k];
}

module.exports = _set;
