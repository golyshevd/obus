'use strict';

var Parser = /** @type Parser */ require('./parser');

var _ = require('lodash-node');
var inherit = require('inherit');
var toIndex = require('./util/to-index');

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
     * @protected
     * @static
     * @memberOf Accessor
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} defaultValue
     * */
    _getByParts: function (root, parts, defaultValue) {
        /*eslint complexity: 0*/
        var i;
        var l;
        var k;
        var part;
        var type;

        for (i = 0, l = parts.length; i < l; i += 1) {

            if (!_.isObject(root)) {

                return defaultValue;
            }

            part = parts[i];
            type = part.type;
            part = part.part;

            if (type !== 'PART' || !_.isArray(root)) {
                root = root[part];

                continue;
            }

            k = toIndex(part);

            if (_.isNaN(k)) {
                root = root[part];

                continue;
            }

            if (k < 0) {
                k = root.length + k;
            }

            if (k < 0) {
                root = root[part];

                continue;
            }

            root = root[k];
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
     * @param {*} v
     *
     * @returns {Boolean}
     * */
    _isFalsy: function (v) {

        return _.isUndefined(v);
    }

});

module.exports = Accessor;
