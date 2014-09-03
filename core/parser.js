'use strict';

var inherit = require('inherit');

function isSpace(s) {

    return /^\s$/.test(s);
}

function isTokenEmpty(s) {

    return /^(?:\\?\s)*$/.test(s);
}

function createToken(s) {

    return s.trimLeft().replace(/\\([\s\S])|\s+$/g, '$1');
}

/**
 * @class Parser
 * */
var Parser = inherit(/** @lends Parser.prototype */ {}, {

    /**
     * @public
     * @static
     * @memberOf Parser
     * @method
     *
     * @param {String} path
     *
     * @returns {Array<String>}
     * */
    parse: function (path) {
        /*eslint complexity: 0*/
        var cursor;
        var i;
        var isEscaped = false;
        var isInBrackets = false;
        var isInRoot = true;
        var l;
        var parts = [];
        var stableIndex = 0;
        var stableLength = 0;
        var token = '';

        if (isTokenEmpty(path)) {

            return parts;
        }

        function back() {
            while (parts.length > stableLength) {
                parts.pop();
            }
            token = path.substring(stableIndex, i + 1);
            isInRoot = true;
        }

        function push(type) {
            token = createToken(token);

            parts[parts.length] = {
                type: type,
                part: token
            };
            token = '';
        }

        for (i = 0, l = path.length; i < l; i += 1) {
            cursor = path.charAt(i);

            if (cursor === '\\' && !isEscaped) {
                isEscaped = true;

                continue;
            }

            if (isEscaped) {

                if (isSpace(cursor)) {
                    cursor = '\\' + cursor;
                }

                token += cursor;
                isEscaped = false;

                if (!isInBrackets && !isInRoot) {
                    back();
                }

                continue;
            }

            if (cursor === '.') {

                if (isInBrackets) {
                    token += cursor;

                    continue;
                }

                if (parts.length === stableLength || !isTokenEmpty(token)) {
                    push('ROOT');
                }

                stableIndex = i + 1;
                stableLength = parts.length;
                isInRoot = true;

                continue;
            }

            if (cursor === '[') {

                if (isInBrackets) {
                    token += cursor;

                    continue;
                }

                if (parts.length && parts.length === stableLength || !isTokenEmpty(token)) {
                    push('ROOT');
                }

                isInBrackets = true;
                isInRoot = false;

                continue;
            }

            if (cursor === ']') {

                if (isInBrackets) {
                    isInBrackets = false;
                    push('PART');

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

            if (isSpace(cursor)) {

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
            push('ROOT');
        }

        return parts;
    }

});

module.exports = Parser;
