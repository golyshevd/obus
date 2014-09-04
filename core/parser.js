'use strict';

var inherit = require('inherit');

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
        var part = '';
        var parts = [];
        var stableIndex = 0;
        var stableLength = 0;

        function back(currentIndex) {
            while (parts.length > stableLength) {
                parts.pop();
            }
            part = path.substring(stableIndex, currentIndex + 1);
            isInRoot = true;
            isInBrackets = false;
        }

        function push(type) {
            part = token(part);
            parts[parts.length] = {
                type: type,
                part: part
            };
            part = '';
        }

        function openPart() {
            if (!isInRoot && isNotSpace(part)) {
                back(i - 1);
            }

            if (isInRoot && parts.length || isNotSpace(part)) {
                push('ROOT');
            }
        }

        for (i = 0, l = path.length; i < l; i += 1) {
            cursor = path.charAt(i);

            if (cursor === '\\' && !isEscaped) {
                part += cursor;
                isEscaped = true;

                continue;
            }

            if (isEscaped) {
                part += cursor;
                isEscaped = false;

                continue;
            }

            if (cursor === '.') {

                if (isInBrackets) {
                    part += cursor;

                    continue;
                }

                if (parts.length === stableLength || isNotSpace(part)) {
                    push('ROOT');
                }

                isInRoot = true;
                stableIndex = i + 1;
                stableLength = parts.length;

                continue;
            }

            if (cursor === '[') {

                if (isInBrackets) {
                    part += cursor;

                    continue;
                }

                openPart();

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
                    part += cursor;

                    continue;
                }

                back(i);

                continue;
            }

            if (isInBrackets || isInRoot) {
                part += cursor;

                continue;
            }

            if (isNotSpace(cursor)) {
                back(i);
            }

        }

        if (isInBrackets) {
            back(i);
        }

        if (isEscaped) {
            part += '\\';
        }

        openPart();

        return parts;
    }

});

function isNotSpace(s) {

    return s && /\S/.test(s);
}

function token(s) {

    return s.trimLeft().replace(/\\([\s\S])|\s+$/g, '$1');
}

module.exports = Parser;
