'use strict';

var _ext = require('./_ext');
var _obj = require('./_obj');
var _own = require('./_own');
var _del = require('./_del');

function _set(obj, path, data) {
    var i;
    var k;
    var l = path.length;

    if (l === 0) {
        _del(obj, path);
        _ext(obj, data);

        return obj;
    }

    for (i = 0, l -= 1; i < l; i += 1) {
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
