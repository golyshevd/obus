'use strict';

var Deque = require('double-ended-queue');

/**
 * @class Cache
 * */
function Cache(maxKeys) {

    /**
     * @private
     * @memberOf {Cache}
     * @property
     * @type {Number}
     * */
    this.__maxKeys = maxKeys;

    /**
     * @private
     * @memberOf {Cache}
     * @property
     * @type {Object}
     * */
    this.__vals = Object.create(null);

    /**
     * @private
     * @memberOf {Cache}
     * @property
     * @type {Deque}
     * */
    this.__keys = new Deque();
}

Cache.prototype = {

    /**
     * @public
     * @memberOf {Cache}
     * @method
     *
     * @param {String} key
     *
     * @returns {*}
     * */
    get: function (key) {

        return this.__vals[key];
    },

    /**
     * @public
     * @memberOf {Cache}
     * @method
     *
     * @param {String} key
     * @param {*} val
     *
     * @returns {Cache}
     * */
    set: function (key, val) {
        var rKey;

        if (!(key in this.__vals)) {
            this.__keys.push(key);
        }

        while (this.__keys.length > this.__maxKeys) {
            rKey = this.__keys.shift();

            delete this.__vals[rKey];
        }

        this.__vals[key] = val;

        return this;
    }

};

module.exports = Cache;
