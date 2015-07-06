'use strict';

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
Obus.parse = require('./parse');

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
Obus.add = require('./add');

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
Obus.del = require('./del');

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
Obus.get = require('./get');

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
Obus.has = require('./has');

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
Obus.set = require('./set');

module.exports = Obus;
