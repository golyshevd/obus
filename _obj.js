'use strict';

function _obj(obj) {
    var t = typeof obj;

    return obj !== null && (t === 'object' || t === 'function');
}

module.exports = _obj;
