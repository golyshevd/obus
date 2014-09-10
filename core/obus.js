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
        this.__root = Object(root);
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
        this.__self.__addByParts(this.__root, this.__self.parse(path), data);

        return this;
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
    del: function (path) {

        return this.__self.__delByParts(this.__root, this.__self.parse(path));
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
        var parts = this.__self.parse(path);

        return this.__self.__getByParts(this.__root, parts, def);
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

        return this.__self.__hasByParts(this.__root, this.__self.parse(path));
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
    set: function (path, data) {
        this.__self.__setByParts(this.__root, this.__self.parse(path), data);

        return this;
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
    }

}, {

    /**
     * @public
     * @static
     * @memberOf {Obus}
     * @method
     *
     * @param {String} s
     *
     * @returns {String}
     * */
    escape: function (s) {

        return s.replace(/[\\.]/g, '\\$&');
    },

    /**
     * @public
     * @static
     * @memberOf {Obus}
     * @method
     *
     * @param {String} str
     *
     * @returns {Array<String>}
     * */
    parse: function (str) {

        if (str) {

            return this.__split(str);
        }

        return [];
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
    },

    /**
     * @private
     * @static
     * @memberOf Obus
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} data
     *
     * @returns {Object}
     * */
    __addByParts: function (root, parts, data) {
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

        return this.__merge(root, parts[l], data);
    },

    /**
     * @private
     * @static
     * @memberOf {Obus}
     * @method
     *
     * @param {Object} root
     * @param {Array<String>} parts
     *
     * @returns {Boolean}
     * */
    __delByParts: function (root, parts) {
        var i;
        var l;

        for (i = 0, l = parts.length - 1; i < l; i += 1) {

            if (_.isObject(root)) {
                root = root[parts[i]];

                continue;
            }

            return false;
        }

        if (_.isObject(root)) {

            return delete root[parts[l]];
        }

        return false;
    },

    /**
     * @private
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
    __getByParts: function (root, parts, def) {
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
     * @private
     * @static
     * @memberOf Obus
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     *
     * @returns {Boolean}
     * */
    __hasByParts: function (root, parts) {
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
     * @private
     * @static
     * @memberOf {Obus}
     * @method
     *
     * @param {Object} root
     * @param {String} part
     * @param {*} data
     *
     * @returns {Object}
     * */
    __merge: function (root, part, data) {

        if (!_.has(root, part)) {
            root[part] = data;

            return root[part];
        }

        if (_.isObject(root[part])) {
//            {a: 42} + {b: 42} = {a: 42, b: 42}
            if (_.isObject(data)) {
                _.forOwn(data, function (data, k) {
                    this.__merge(root[part], k, data);
                }, this);

                return root[part];
            }

            //  [1,2] + 3 = [1,2,3]
            if (_.isArray(root[part])) {
                root[part].push(data);

                return root[part];
            }

            //  {} + 5 = {}
            return root[part];
        }

        //  5 + {} = {}
        if (_.isObject(data)) {
            root[part] = data;

            return root[part];
        }

        //  5 + 5 = [5, 5]
        root[part] = [root[part], data];

        return root[part];
    },

    /**
     * @private
     * @static
     * @memberOf Obus
     * @method
     *
     * @param {Object} root
     * @param {Array} parts
     * @param {*} data
     *
     * @returns {Object}
     * */
    __setByParts: function (root, parts, data) {
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
        root[part] = data;

        return root[part];
    },

    /**
     * @private
     * @static
     * @memberOf {Obus}
     * @method
     *
     * @param {String} str
     *
     * @returns {Array<String>}
     * */
    __split: function (str) {
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
    }

});

module.exports = Obus;
