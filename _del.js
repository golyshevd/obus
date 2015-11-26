'use strict';

var _own = require('./_own');
var _obj = require('./_obj');

function _del(obj, path) {
    var i = 0;
    var k = '';
    var l = path.length - 1;

    for (; i < l; i += 1) {
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
