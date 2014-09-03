'use strict';

var Parser = /** @type Parser */ require('./parser');

var _ = require('lodash-node');
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

        for (i = 0, l = parts.length; i < l; i += 1) {

            if (!_.isObject(root)) {

                return defaultValue;
            }

            part = parts[i];

            if (part.type !== 'PART' || !_.isArray(root)) {
                root = root[part.part];

                continue;
            }

            k = toInt(part.part);

            if (_.isNaN(k)) {
                root = root[part.part];

                continue;
            }

            if (k < 0) {
                k = root.length + k;
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

function toInt(s) {

    if (!s || s.indexOf('.') > -1) {

        return NaN;
    }

    if (/^-?0[0-7]+$/.test(s)) {

        return parseInt(s, 8);
    }

    if (/^-?0x/i.test(s)) {

        return parseInt(s, 16);
    }

    return Number(s);
}

module.exports = Accessor;
