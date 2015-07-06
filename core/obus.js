/*eslint complexity: 0*/
'use strict';

var hasProperty = Object.prototype.hasOwnProperty;
var parse = require('../parse');

/**
 * @class Obus
 * */
function Obus() {}

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @constructs
 * */
Obus.prototype.constructor = Obus;

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 * @param {*} data
 *
 * @returns {*}
 * */
Obus.prototype.add = function (path, data) {
    return Obus.add(this, path, data);
};

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.prototype.del = function (path) {
    return Obus.del(this, path);
};

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 * @param {*} [def]
 *
 * @returns {*}
 * */
Obus.prototype.get = function (path, def) {
    return Obus.get(this, path, def);
};

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.prototype.has = function (path) {
    return Obus.has(this, path);
};

/**
 * @public
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 * @param {*} data
 *
 * @returns {*}
 * */
Obus.prototype.set = function (path, data) {
    return Obus.set(this, path, data);
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {String} path
 *
 * @returns {Array}
 * */
Obus.parse = require('../parse');

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} data
 *
 * @returns {*}
 * */
Obus.add = function (obj, path, data) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    if (!parts.length) {
        for (i in data) {
            if (hasProperty.call(data, i)) {
                obj[i] = data[i];
            }
        }

        return obj;
    }

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (obj && hasProperty.call(obj, k) && obj[k] &&
            (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
            obj = obj[k];

            continue;
        }

        obj = obj[k] = {};
    }

    k = parts[l];

    if (hasProperty.call(obj, k) && obj[k] &&
        (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
        obj = obj[k];
        for (i in data) {
            if (hasProperty.call(data, i)) {
                obj[i] = data[i];
            }
        }

        return obj;
    }

    obj[k] = data;

    return obj[k];
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.del = function (obj, path) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    if (!parts.length) {
        return false;
    }

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (obj && hasProperty.call(obj, k) && obj[k] &&
            (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
            obj = obj[k];

            continue;
        }

        return false;
    }

    return delete obj[parts[l]];
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} [def]
 *
 * @returns {*}
 * */
Obus.get = function (obj, path, def) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length; i < l; i += 1) {
        k = parts[i];

        if (obj && (typeof obj === 'object' || typeof obj === 'function') && hasProperty.call(obj, k)) {
            obj = obj[k];

            continue;
        }

        return def;
    }

    if (obj === void 0) {

        return def;
    }

    return obj;
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.has = function (obj, path) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length; i < l; i += 1) {
        k = parts[i];

        if (obj && (typeof obj === 'object' || typeof obj === 'function') && hasProperty.call(obj, k)) {
            obj = obj[k];

            continue;
        }

        return false;
    }

    return true;
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} data
 *
 * @returns {*}
 * */
Obus.set = function (obj, path, data) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    if (!parts.length) {
        for (i in obj) {
            if (hasProperty.call(obj, i)) {
                delete obj[i];
            }
        }

        for (i in data) {
            if (hasProperty.call(data, i)) {
                obj[i] = data[i];
            }
        }

        return obj;
    }

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (obj && hasProperty.call(obj, k) && obj[k] &&
            (typeof obj[k] === 'object' || typeof obj[k] === 'function')) {
            obj = obj[k];

            continue;
        }

        obj = obj[k] = {};
    }

    k = parts[l];
    obj[k] = data;

    return obj[k];
};

module.exports = Obus;
