'use strict';

var _obj = require('./_obj');

function _get(obj, path) {
    var i = 0;
    var l = path.length;

    for (; i < l; i += 1) {
        if (_obj(obj)) {
            obj = obj[path[i]];
            continue;
        }

        return undefined;
    }

    return obj;
}

module.exports = _get;
