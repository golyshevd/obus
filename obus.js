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
 * @param {Array} parts
 *
 * @returns {String}
 * */
Obus.format = require('./format');

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

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 *
 * @returns {Boolean}
 * */
Obus.obj = require('./_obj');

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} obj
 * @param {String} k
 *
 * @returns {Boolean}
 * */
Obus.own = require('./_own');

Obus._parse = require('./_parse');
Obus._add = require('./_add');
Obus._del = require('./_del');
Obus._get = require('./_get');
Obus._has = require('./_has');
Obus._set = require('./_set');

module.exports = Obus;
