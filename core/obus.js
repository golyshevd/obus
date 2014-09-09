'use strict';

var _ = require('lodash-node');
var inherit = require('inherit');

/**
 * @class Obus
 * */
var Obus = inherit(/** @lends Obus.prototype */ {

    /**
     * @private
     * @memberOf {Obus}
     * @method
     *
     * @constructs
     *
     * @param {Object} root
     * */
    __constructor: function (root) {

        /**
         * @private
         * @memberOf {Obus}
         * @property
         * @type {Object}
         * */
        this.__root = root;
    },

    /**
     * @public
     * @memberOf {Obus}
     * @method
     *
     * @param {String} str
     *
     * @returns {Array<String>}
     * */
    split: function (str) {
        var chr;
        var i;
        var isEscaped = false;
        var l;
        var part = '';
        var parts = [];

        function acceptPart() {
            parts[parts.length] = part;
            part = '';
        }

        for (i = 0, l = str.length; i < l; i += 1) {
            chr = str.charAt(i);

            if (chr === '\\' && !isEscaped) {
                isEscaped = true;

                continue;
            }

            if (isEscaped) {
                part += chr;
                isEscaped = false;

                continue;
            }

            if (chr === '.') {
                acceptPart();

                continue;
            }

            part += chr;
        }

        acceptPart();

        return parts;
    },

    /**
     * @public
     * @memberOf {Obus}
     * @method
     *
     * @param {String} str
     *
     * @returns {Array<String>}
     * */
    parse: function (str) {

        if (str) {

            return this.split(str);
        }

        return [];
    },

    /**
     * @public
     * @memberOf {Obus}
     * @method
     *
     * @returns {Object}
     * */
    valueOf: function () {

        return this.__root;
    },

    /**
     * @public
     * @memberOf {Obus}
     * @method
     *
     * @param {String} path
     * @param {*} data
     *
     * @returns {Obus}
     * */
    add: function (path, data) {
        var parts = this.parse(path);

        return this._addByParts(this.__root, parts, data);
    },

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
    get: function (path, def) {
        var parts = this.parse(path);

        return this._getByParts(this.__root, parts, def);
    },

    /**
     * @public
     * @memberOf {Obus}
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
     * @public
     * @memberOf {Obus}
     * @method
     *
     * @param {String} path
     * @param {*} data
     * @param {Boolean} [soft]
     *
     * @returns {Obus}
     * */
    set: function (path, data, soft) {
        var parts = this.parse(path);

        return this._setByParts(this.__root, parts, data, soft);
    },

    /**
     * @protected
     * @static
     * @memberOf Obus
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} data
     *
     * @returns {Obus}
     * */
    _addByParts: function (root, parts, data) {
        var existing = this._getByParts(root, parts, void 0);

        if (_.isObject(existing)) {
            _.extend(existing, data);

            return this;
        }

        return this._setByParts(root, parts, data, true);
    },

    /**
     * @protected
     * @static
     * @memberOf Obus
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

            root = root[parts[i]];
        }

        if (this._isFalsy(root)) {

            return def;
        }

        return root;
    },

    /**
     * @protected
     * @static
     * @memberOf Obus
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
            k = parts[i];

            if (_.has(root, k)) {
                root = root[k];

                continue;
            }

            return false;
        }

        return !this._isFalsy(root);
    },

    /**
     * @protected
     * @static
     * @memberOf Obus
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} data
     * @param {Boolean} soft
     *
     * @returns {Obus}
     * */
    _setByParts: function (root, parts, data, soft) {
        var i;
        var l;
        var part;

        for (i = 0, l = parts.length - 1; i < l; i += 1) {
            part = parts[i];

            if (!_.has(root, part) || !_.isObject(root[part])) {
                root[part] = {};
            }

            root = root[part];
        }

        part = parts[l];

        if (soft && _.has(root, part)) {

            if (_.isArray(root[part])) {
                root[part].push(data);

                return this;
            }

            root[part] = [root[part], data];

        } else {
            root[part] = data;
        }

        return this;
    },

    /**
     * @protected
     * @static
     * @memberOf Obus
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

module.exports = Obus;
