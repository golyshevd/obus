'use strict';

var _own = require('./_own');
var _obj = require('./_obj');

function clean(obj) {
    var i;
    var l;
    var keys = Object.keys(obj);
    var result = true;

    for (i = 0, l = keys.length; i < l; i += 1) {
        if (delete obj[keys[i]]) {
            continue;
        }

        result = false;
    }

    return result;
}

function _del(obj, path) {
    var i;
    var k;
    var l = path.length;

    if (l === 0) {
        return clean(obj);
    }

    for (i = 0, l -= 1; i < l; i += 1) {
        k = path[i];

        if (_own(obj, k) && _obj(obj[k])) {
            obj = obj[k];

            continue;
        }

        return false;
    }

    return delete obj[path[l]];
}

module.exports = _del;
