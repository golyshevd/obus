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
    splitPath: function (path) {
        /*eslint complexity: 0*/
        var cursor;
        var i;
        var isEscaped = false;
        var isInBrackets = false;
        var l;
        var part = '';
        var parts = [];

        if (!path) {

            return parts;
        }

        for (i = 0, l = path.length; i < l; i += 1) {
            cursor = path.charAt(i);

            if (cursor === '\\' && !isEscaped) {
                isEscaped = true;

                continue;
            }

            if (isEscaped) {
                part += '\\' + cursor;
                isEscaped = false;

                continue;
            }

            switch (cursor) {
                /*eslint no-fallthrough: 0*/
                case '.':

                    if (isInBrackets) {

                        break;
                    }

                    parts.push(part);
                    part = '';

                    continue;

                case '[':
                    isInBrackets = true;

                    break;

                case ']':
                    isInBrackets = false;

                    break;

                default:

                    break;

            }

            part += cursor;
        }

        if (isEscaped) {
            part += '\\';
        }

        return parts.concat(part);
    },

    /**
     * @public
     * @memberOf {Parser}
     * @method
     *
     * @param {String} path
     *
     * @returns {Array<String>}
     * */
    parsePart: function (path) {
        /*eslint complexity: 0*/
        var cursor = '';
        var i;
        var isEscaped = false;
        var isInBrackets = false;
        var isInRoot = true;
        var l;
        var part = '';
        var parts = [];
        var self = this;

        function back() {
            parts = [];
            part = path.slice(0, i + 1);
            part = self.unescape(part);
            isInRoot = true;
        }

        for (i = 0, l = path.length; i < l; i += 1) {
            cursor = path.charAt(i);

            if (cursor === '\\' && !isEscaped) {
                isEscaped = true;

                continue;
            }

            if (isEscaped) {
                part += cursor;
                isEscaped = false;

                continue;
            }

            if (cursor === '[') {

                if (isInBrackets) {
                    part += cursor;

                    continue;
                }

                if (!parts.length || part) {
                    parts.push({
                        type: 'ROOT',
                        part: part
                    });
                }

                isInBrackets = true;
                isInRoot = false;
                part = '';

                continue;
            }

            if (cursor === ']') {

                if (isInBrackets) {
                    isInBrackets = false;
                    parts.push({
                        type: 'PART',
                        part: part
                    });
                    part = '';

                    continue;
                }

                if (isInRoot) {
                    part += cursor;

                    continue;
                }

                back();

                continue;
            }

            if (isInBrackets || isInRoot) {
                part += cursor;

                continue;
            }

            back();
        }

        if (isInBrackets) {
            back();
        }

        if (isEscaped) {
            part += '\\';
        }

        if (isInRoot) {
            parts.push({
                type: 'ROOT',
                part: part
            });
        }

        return parts;
    },

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
        var parts = this.splitPath(path);

        return _.reduce(parts, this.__reducePart, [], this);
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
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Array<String>}
     * */
    __reducePart: function (parts, part, i) {
        part = this.parsePart(part);

        //  [a][b][c], skip "" root
        if (i === 0 && part.length > 1 && !part[0].part) {
            part = part.slice(1);
        }

        return parts.concat(part);
    }

});

module.exports = Parser;
