'use strict';

var R_DEGRADE = /^\s*[^\s.\[]/;
var R_SEARCH = /^\s*([^\s])([\s\S]*)$/;
var R_IDENT = /^\s*([_a-z$][\w$]*)([\s\S]*)$/i;
var R_OPEN_ACCESS = /^\s*(['"])([\s\S]*)$/;
var R_STRING1 = /^((?:\\[\s\S]|[^"])*)"([\s\S]*)$/;
var R_ESCAPED = /\\([\s\S])/g;
var R_STRING2 = /^((?:\\[\s\S]|[^'])*)'([\s\S]*)$/;
var R_CLOSE_ACCESS = /^\s*]([\s\S]*)$/;
function unescape(s) {
    return s.replace(R_ESCAPED, '$1');
}

function _parse(str) {
    /*eslint complexity: 0*/
    var s = str;
    var m;
    var state = '?';
    var parts = [];

    if (R_DEGRADE.test(s)) {
        state = '.';
    }

    while (state !== 'EOF') {

        switch (state) {

            case '?':
                m = R_SEARCH.exec(s);

                if (m) {
                    s = m[2];
                    state = m[1];
                    break;
                }

                state = 'EOF';
                break;

            case '.':
                m = R_IDENT.exec(s);

                if (m) {
                    parts.push(m[1]);
                    s = m[2];
                    state = '?';
                    break;
                }

                state = 'INVALID';
                break;

            case '[':
                m = R_OPEN_ACCESS.exec(s);

                if (m) {
                    s = m[2];
                    state = m[1];
                    break;
                }

                state = 'INVALID';
                break;

            case '"':
                m = R_STRING1.exec(s);

                if (m) {
                    parts.push(unescape(m[1]));
                    s = m[2];
                    state = ']';
                    break;
                }

                state = 'INVALID';
                break;

            case '\'':
                m = R_STRING2.exec(s);

                if (m) {
                    parts.push(unescape(m[1]));
                    s = m[2];
                    state = ']';
                    break;
                }

                state = 'INVALID';
                break;

            case ']':
                m = R_CLOSE_ACCESS.exec(s);

                if (m) {
                    s = m[1];
                    state = '?';
                    break;
                }

                state = 'INVALID';
                break;

            default:
                throw new SyntaxError(str);

        }
    }

    if (parts.length === 0) {
        throw new SyntaxError(str);
    }

    return parts;
}

module.exports = _parse;
