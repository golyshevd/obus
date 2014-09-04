'use strict';

var Parser = /** @type Parser */ require('./parser');

var _ = require('lodash-node');
var getKey = require('./util/get-key');
var inherit = require('inherit');

/**
 * @class Accessor
 * */
var Accessor = inherit(/** @lends Accessor.prototype */ {

    /**
     * @private
     * @memberOf {Accessor}
     * @method
     *
     * @constructs
     *
     * @param {Object} root
     * @param {Object} [params]
     * */
    __constructor: function (root, params) {

        /**
         * @private
         * @memberOf {Accessor}
         * @property
         * @type {Object}
         * */
        this.__root = root;

        /**
         * @public
         * @memberOf {Accessor}
         * @property
         *
         * @type {Object}
         * */
        this.params = _.extend({}, this.params, params);
    },

    parse: function (path) {

        return new Parser(path, this.params).parts;
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
     * @param {*} [def]
     *
     * @returns {*}
     * */
    get: function (path, def) {
        var parts = this.parse(path);

        return this._getByParts(this.__root, parts, def);
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
        var parts = this.parse(path);

        return this._hasByParts(this.__root, parts);
    },

    /**
     * @protected
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} def
     *
     * @returns {*}
     * */
    _getByParts: function (root, parts, def) {
        var i;
        var l;

        for (i = 0, l = parts.length; i < l; i += 1) {

            if (!_.isObject(root)) {

                return def;
            }

            root = root[getKey(root, parts[i])];
        }

        if (this._isFalsy(root)) {

            return def;
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
