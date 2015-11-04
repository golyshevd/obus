'use strict';

var R_SEARCH = /^\s*([^\s])([\s\S]*)/;
var R_DEGRADE = /^\s*[^\s.\[]/;
var R_IDENT = /^\s*([_a-z$][\w$]*)([\s\S]*)$/i;
var R_OPEN_ACCESS = /^\s*(?:(\d+)|(['"]))([\s\S]*)$/;
var R_STRING1 = /^((?:\\[\s\S]|[^"])*)"([\s\S]*)$/;
var R_STRING2 = /^((?:\\[\s\S]|[^'])*)'([\s\S]*)$/;
var R_CLOSE_ACCESS = /^\s*]([\s\S]*)$/;

function unescape(s) {
    return s.replace(/\\([\s\S])/g, '$1');
}

function _parse(s) {
    /*eslint  default-case: 0, complexity: 0*/
    var orig = s;
    var m;
    var state = '?';
    var parts = [];

    if (R_DEGRADE.test(s)) {
        // TODO deprecate
        state = '.';
    }

    while (state !== 'EOF') {

        switch (state) {

            case '?':
                m = R_SEARCH.exec(s);

                if (!m) {
                    state = 'EOF';
                    break;
                }

                s = m[2];
                state = m[1];
                break;

            case '.':
                m = R_IDENT.exec(s);

                if (!m) {
                    state = 'INVALID';
                    break;
                }

                s = m[2];
                parts[parts.length] = m[1];
                state = '?';
                break;

            case '[':
                m = R_OPEN_ACCESS.exec(s);

                if (!m) {
                    state = 'INVALID';
                    break;
                }

                s = m[3];

                if (m[1]) {
                    parts[parts.length] = parseInt(m[1], 10);
                    state = ']';
                    break;
                }

                state = m[2];
                break;

            case '"':
                m = R_STRING1.exec(s);

                if (!m) {
                    state = 'INVALID';
                    break;
                }

                s = m[2];
                parts[parts.length] = unescape(m[1]);
                state = ']';
                break;

            case '\'':
                m = R_STRING2.exec(s);

                if (!m) {
                    state = 'INVALID';
                    break;
                }

                s = m[2];
                parts[parts.length] = unescape(m[1]);
                state = ']';
                break;

            case ']':
                m = R_CLOSE_ACCESS.exec(s);

                if (!m) {
                    state = 'INVALID';
                    break;
                }

                s = m[1];
                state = '?';
                break;

            default:
                throw new SyntaxError(orig);

        }
    }

    return parts;
}

module.exports = _parse;
