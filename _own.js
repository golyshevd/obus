'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var _obj = require('./_obj');

function _own(obj, k) {
    return _obj(obj) && hasProperty.call(obj, k);
}

module.exports = _own;
