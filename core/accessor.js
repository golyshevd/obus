'use strict';

var Parser = /** @type Parser */ require('./parser');

var _ = require('lodash-node');
var getKey = require('./util/get-key');
var inherit = require('inherit');

/**
 * @class Accessor
 * @extends Parser
 * */
var Accessor = inherit(Parser, /** @lends Accessor.prototype */ {

    /**
     * @private
     * @memberOf {Accessor}
     * @method
     *
     * @constructs
     *
     * @param {Object} [root]
     * */
    __constructor: function (root) {
        this.__base();

        if (!_.isObject(root)) {
            root = {};
        }

        /**
         * @private
         * @memberOf {Accessor}
         * @property
         * @type {Object}
         * */
        this.__root = root;
    },

    /**
     * @public
     * @memberOf {Accessor}
     * @method
     *
     * @returns {Object}
     * */
    valueOf: function () {

        return this.__root;
    },

    /**
     * @public
     * @memberOf {Accessor}
     * @method
     *
     * @param {String} path
     * @param {*} [defaultValue]
     *
     * @returns {*}
     * */
    get: function (path, defaultValue) {

        return this.__self.get(this.valueOf(), path, defaultValue);
    },

    /**
     * @public
     * @memberOf {Accessor}
     * @method
     *
     * @param {String} path
     *
     * @returns {Boolean}
     * */
    has: function (path) {

        return this.__self.has(this.valueOf(), path);
    }

}, {

    /**
     * @public
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {String} path
     * @param {*} [defaultValue]
     *
     * @returns {*}
     * */
    get: function (root, path, defaultValue) {
        var parts = this.parse(path);

        return this._getByParts(root, parts, defaultValue);
    },

    /**
     * @public
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {String} path
     *
     * @returns {Boolean}
     * */
    has: function (root, path) {
        var parts = this.parse(path);

        return this._hasByParts(root, parts);
    },

    /**
     * @protected
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} defaultValue
     *
     * @returns {*}
     * */
    _getByParts: function (root, parts, defaultValue) {
        var i;
        var l;

        for (i = 0, l = parts.length; i < l; i += 1) {

            if (!_.isObject(root)) {

                return defaultValue;
            }

            root = root[getKey(root, parts[i])];
        }

        if (this._isFalsy(root)) {

            return defaultValue;
        }

        return root;
    },

    /**
     * @protected
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     *
     * @returns {Boolean}
     * */
    _hasByParts: function (root, parts) {
        var i;
        var k;
        var l;

        for (i = 0, l = parts.length; i < l; i += 1) {
            k = getKey(root, parts[i]);

            if (_.has(root, k)) {
                root = root[k];

                continue;
            }

            return false;
        }

        return true;
    },

    /**
     * @protected
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {*} v
     *
     * @returns {Boolean}
     * */
    _isFalsy: function (v) {

        return _.isUndefined(v);
    }

});

module.exports = Accessor;
