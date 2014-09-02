'use strict';

var _ = require('lodash-node');
var inherit = require('inherit');

/**
 * @class Parser
 * */
var Parser = inherit(/** @lends Parser.prototype */ {

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @constructs
     *
     * @param {Object} [params]
     * */
    __constructor: function (params) {

        /**
         * @public
         * @memberOf {Parser}
         * @property
         * @type {Object}
         * */
        this.params = _.extend({}, this.params, params);
    },

    /**
     * @public
     * @memberOf {Parser}
     * @property
     * @type {Object}
     * */
    params: {},

    /**
     * @public
     * @memberOf {Parser}
     * @method
     *
     * @param {String} path
     *
     * @returns {Array<String>}
     * */
    parsePath: function (path) {
        /*eslint complexity: 0*/
        var cursor;
        var i;
        var isEscaped = false;
        var isInBrackets = false;
        var isInRoot = true;
        var l;
        var parts = [];
        var self = this;
        var stableIndex = 0;
        var stableLength = 0;
        var token = '';

        if (!path) {

            return parts;
        }

        function back() {
            while (parts.length > stableLength) {
                parts.pop();
            }
            token = path.substring(stableIndex, i + 1);
            token = self.unescape(token);
            isInRoot = true;
        }

        for (i = 0, l = path.length; i < l; i += 1) {
            cursor = path.charAt(i);

            if (cursor === '\\' && !isEscaped) {
                isEscaped = true;

                continue;
            }

            if (isEscaped) {
                token += cursor;
                isEscaped = false;

                continue;
            }

            if (cursor === '.') {

                if (isInBrackets) {
                    token += cursor;

                    continue;
                }

                if (parts.length === stableLength || token) {
                    parts[parts.length] = {
                        type: 'ROOT',
                        part: token
                    };
                }

                stableIndex = i + 1;
                stableLength = parts.length;
                isInRoot = true;
                token = '';

                continue;
            }

            if (cursor === '[') {

                if (isInBrackets) {
                    token += cursor;

                    continue;
                }

                if (parts.length && parts.length === stableLength || token) {
                    parts[parts.length] = {
                        type: 'ROOT',
                        part: token
                    };
                }

                isInBrackets = true;
                isInRoot = false;
                token = '';

                continue;
            }

            if (cursor === ']') {

                if (isInBrackets) {
                    isInBrackets = false;
                    parts[parts.length] = {
                        type: 'PART',
                        part: token
                    };
                    token = '';

                    continue;
                }

                if (isInRoot) {
                    token += cursor;

                    continue;
                }

                back();

                continue;
            }

            if (isInBrackets || isInRoot) {
                token += cursor;

                continue;
            }

            back();
        }

        if (isInBrackets) {
            back();
        }

        if (isEscaped) {
            token += '\\';
        }

        if (isInRoot) {
            parts[parts.length] = {
                type: 'ROOT',
                part: token
            };
        }

        return parts;
    },

    /**
     * @public
     * @memberOf {Parser}
     * @method
     *
     * @param {String} s
     *
     * @returns {String}
     * */
    unescape: function (s) {

        return s.replace(/\\([\s\S])/g, '$1');
    }

});

module.exports = Parser;
