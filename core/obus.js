/*eslint complexity: 0*/
'use strict';

var hasProperty = Object.prototype.hasOwnProperty;

/**
 * @class Obus
 * */
function Obus() {}

Obus.prototype = {

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
        var i;
        var k;
        var l;
        var parts = Obus.parse(path);
        var self = this;

        if (!parts.length) {
            return false;
        }

        for (i = 0, l = parts.length - 1; i < l; i += 1) {
            k = parts[i];

            if (self && hasProperty.call(self, k) && self[k] && typeof self[k] === 'object') {
                self = self[k];

                continue;
            }

            return false;
        }

        return delete self[parts[l]];
    },

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
    add: function (path, data) {
        var i;
        var k;
        var l;
        var parts = Obus.parse(path);
        var self = this;

        if (!parts.length) {
            for (i in data) {
                if (hasProperty.call(data, i)) {
                    self[i] = data[i];
                }
            }

            return self;
        }

        for (i = 0, l = parts.length - 1; i < l; i += 1) {
            k = parts[i];

            if (self && hasProperty.call(self, k) && self[k] && typeof self[k] === 'object') {
                self = self[k];

                continue;
            }

            self = self[k] = {};
        }

        k = parts[l];

        if (hasProperty.call(self, k) && self[k] && typeof self[k] === 'object') {
            for (i in data) {
                if (hasProperty.call(data, i)) {
                    self[k][i] = data[i];
                }
            }

            return self[k];
        }

        self[k] = data;

        return self[k];
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
        var i;
        var k;
        var l;
        var parts = Obus.parse(path);
        var self = this;

        for (i = 0, l = parts.length; i < l; i += 1) {
            k = parts[i];

            if (self && typeof self === 'object' && hasProperty.call(self, k)) {
                self = self[k];

                continue;
            }

            return def;
        }

        if (self === void 0) {

            return def;
        }

        return self;
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
        var i;
        var k;
        var l;
        var parts = Obus.parse(path);
        var self = this;

        for (i = 0, l = parts.length; i < l; i += 1) {
            k = parts[i];

            if (self && typeof self === 'object' && hasProperty.call(self, k)) {
                self = self[k];

                continue;
            }

            return false;
        }

        return true;
    },

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
    set: function (path, data) {
        var i;
        var k;
        var l;
        var parts = Obus.parse(path);
        var self = this;

        if (!parts.length) {
            for (i in self) {
                if (hasProperty.call(self, i)) {
                    delete self[i];
                }
            }

            for (i in data) {
                if (hasProperty.call(data, i)) {
                    self[i] = data[i];
                }
            }

            return self;
        }

        for (i = 0, l = parts.length - 1; i < l; i += 1) {
            k = parts[i];

            if (self && hasProperty.call(self, k) && self[k] && typeof self[k] === 'object') {
                self = self[k];

                continue;
            }

            self = self[k] = {};
        }

        k = parts[l];
        self[k] = data;

        return self[k];
    }
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
Obus.parse = function (path) {

    if (typeof path === 'string') {
        return path.split('.');
    }

    return [];
};

module.exports = Obus;
