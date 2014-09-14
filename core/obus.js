'use strict';

var Cache = /** @type Cache */ require('./util/cache');

var hasProperty = Object.prototype.hasOwnProperty;

/**
 * @class Obus
 * */
function Obus(root) {

    /**
     * @private
     * @memberOf {Obus}
     * @property
     * @type {Object}
     * */
    this.__root = Object(root);
}

Obus.prototype = {

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
        Obus.add(this.__root, path, data);

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

        return Obus.del(this.__root, path);
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

        return Obus.get(this.__root, path, def);
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

        return Obus.has(this.__root, path);
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
        Obus.set(this.__root, path, data);

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

};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} path
 * @param {*} data
 *
 * @returns {Object}
 * */
Obus.add = function (root, path, data) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (root && hasProperty.call(root, k) && root[k] && typeof root[k] === 'object') {
            root = root[k];

            continue;
        }

        root = root[k] = {};
    }

    k = parts[l];

    root[k] = Obus.__merge(root, k, data);

    return root[k];
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @property
 * @type {Cache}
 * */
Obus.cache = new Cache(0xFFFF);

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.del = function (root, path) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (root && hasProperty.call(root, k) && root[k] && typeof root[k] === 'object') {
            root = root[k];

            continue;
        }

        return false;
    }

    return delete root[parts[l]];
};

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
Obus.escape = function (s) {

    return s.replace(/[\\.]/g, '\\$&');
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} path
 * @param {*} [def]
 *
 * @returns {*}
 * */
Obus.get = function (root, path, def) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length; i < l; i += 1) {
        k = parts[i];

        if (root && typeof root === 'object' && hasProperty.call(root, k)) {
            root = root[k];

            continue;
        }

        return def;
    }

    if (this._isFalsy(root)) {

        return def;
    }

    return root;
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} path
 *
 * @returns {Boolean}
 * */
Obus.has = function (root, path) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length; i < l; i += 1) {
        k = parts[i];

        if (root && typeof root === 'object' && hasProperty.call(root, k)) {
            root = root[k];

            continue;
        }

        return false;
    }

    return !Obus._isFalsy(root);
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {*} data
 *
 * @returns {Object}
 * */
Obus.merge = function (root, data) {
    /*eslint complexity: 0*/
    var k;

    if (root && typeof root === 'object') {
//        {a: 42} + {b: 42} = {a: 42, b: 42}
        if (data && typeof data === 'object') {
            for (k in data) {
                if (hasProperty.call(data, k)) {
                    root[k] = Obus.__merge(root, k, data[k]);
                }
            }
        } else if (Array.isArray(root)) {
//            [1, 2] + 3 = [1, 2,3]
            root[root.length] = data;
        }

//        {} + 5 = {}
    } else if (data && typeof data === 'object') {
//        5 + {} = {}
        root = data;
    } else {
//        5 + 5 = [5, 5]
        root = [root, data];
    }

    return root;
};

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
Obus.parse = function (str) {
    var parts = Obus.cache.get(str);

    if (!parts) {
        parts = str === '' ? [] : Obus.__split(str);

        Obus.cache.set(str, parts);
    }

    return parts;
};

/**
 * @public
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} path
 * @param {*} data
 *
 * @returns {Object}
 * */
Obus.set = function (root, path, data) {
    var i;
    var k;
    var l;
    var parts = Obus.parse(path);

    for (i = 0, l = parts.length - 1; i < l; i += 1) {
        k = parts[i];

        if (root && hasProperty.call(root, k) && root[k] && typeof root[k] === 'object') {
            root = root[k];

            continue;
        }

        root = root[k] = {};
    }

    k = parts[l];
    root[k] = data;

    return root[k];
};

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
Obus._isFalsy = function (v) {

    return v === void 0;
};

/**
 * @private
 * @static
 * @memberOf {Obus}
 * @method
 *
 * @param {Object} root
 * @param {String} k
 * @param {*} data
 *
 * @returns {Object}
 * */
Obus.__merge = function (root, k, data) {

    if (root && hasProperty.call(root, k)) {

        return Obus.merge(root[k], data);
    }

    return data;
};

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
Obus.__split = function (str) {
    var chr;
    var i;
    var isEscaped = false;
    var l;
    var part = '';
    var parts = [];

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
            parts[parts.length] = part;
            part = '';

            continue;
        }

        part += chr;
    }

    parts[parts.length] = part;

    return parts;
};

module.exports = Obus;
