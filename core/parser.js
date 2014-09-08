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
     * @param {String} query
     * @param {Object} [params]
     *
     * @constructs
     * */
    __constructor: function (query, params) {
        var matchers = [
            this.__guessReverseSolidus,
            this.__guessEscaped,
            this.__guessPeriod,
            this.__guessLeftSquareBracket,
            this.__guessRightSquareBracket,
            this.__guessFreeChar
        ];

        this.params = params || {};
        this.parts = [];

        this.__query = query;
        this.__isEscaped = false;
        this.__isInBrackets = false;
        this.__isInRoot = true;
        this.__part = '';
        this.__stableIndex = 0;
        this.__stableLength = 0;
        this.__cursor = null;

        this.__next = 0;

        /*eslint no-cond-assign: 0, no-plusplus: 0*/
        while (this.__cursor = this.__charAt(this.__next++)) {

            if (_.some(matchers, this.__guess, this)) {

                continue;
            }

            if (this.__isNotASpace(this.__cursor)) {
                this.__backup(this.__next);
            }
        }

        this.__teardown();
    },

    /**
     * @public
     * @memberOf {Parser}
     * @property
     * @type {Object}
     * */
    params: {},

    /**
     * @private
     * @memberOf {Parser}
     * @method
     * */
    __acceptChar: function () {
        this.__part += this.__cursor;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {String} type
     * */
    __acceptPart: function (type) {
        var part = this.__tokenize(this.__part);

        this.parts.push({
            type: type,
            part: part
        });
        this.__part = '';
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {Number} pos
     * */
    __backup: function (pos) {
        while (this.parts.length > this.__stableLength) {
            this.parts.pop();
        }
        this.__part = this.__query.substring(this.__stableIndex, pos);
        this.__isInRoot = true;
        this.__isInBrackets = false;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {Number} pos
     *
     * @returns {String}
     * */
    __charAt: function (pos) {

        return this.__query.charAt(pos);
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {Function} func
     *
     * @returns {Boolean}
     * */
    __guess: function (func) {

        return func.call(this);
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessEscaped: function () {

        if (this.__isEscaped) {
            this.__acceptChar();
            this.__isEscaped = false;

            return true;
        }

        return false;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessFreeChar: function () {

        if (this.__isInBrackets || this.__isInRoot) {
            this.__acceptChar();

            return true;
        }

        return false;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessLeftSquareBracket: function () {

        if (this.__cursor !== '[') {

            return false;
        }

        if (this.__isInBrackets) {
            this.__acceptChar();

            return true;
        }

        this.__openPart();

        this.__isInBrackets = true;
        this.__isInRoot = false;

        return true;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessPeriod: function () {

        if (this.__cursor !== '.') {

            return false;
        }

        if (this.__isInBrackets) {
            this.__acceptChar();

            return true;
        }

        if (this.parts.length === this.__stableLength || this.__isNotASpace(this.__part)) {
            this.__acceptPart('ROOT');
        }

        this.__isInRoot = true;
        this.__stableIndex = this.__next;
        this.__stableLength = this.parts.length;

        return true;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessReverseSolidus: function () {

        if (this.__cursor === '\\' && !this.__isEscaped) {
            this.__acceptChar();
            this.__isEscaped = true;

            return true;
        }

        return false;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @returns {Boolean}
     * */
    __guessRightSquareBracket: function () {

        if (this.__cursor !== ']') {

            return false;
        }

        if (this.__isInBrackets) {
            this.__isInBrackets = false;
            this.__acceptPart('PART');

            return true;
        }

        if (this.__isInRoot) {
            this.__acceptChar();

            return true;
        }

        this.__backup(this.__next);

        return true;
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {String} s
     *
     * @returns {Boolean}
     * */
    __isNotASpace: function (s) {

        if (this.params.strictSpaces) {

            return Boolean(s);
        }

        return s && /\S/.test(s);
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     * */
    __openPart: function () {
        if (!this.__isInRoot && this.__isNotASpace(this.__part)) {
            this.__backup(this.__next - 1);
        }

        if (this.__isInRoot && this.parts.length || this.__isNotASpace(this.__part)) {
            this.__acceptPart('ROOT');
        }
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     * */
    __teardown: function () {

        if (this.__isInBrackets) {
            this.__backup(this.__next);
        }

        if (this.__isEscaped) {
            this.__part += '\\';
        }

        this.__openPart();
    },

    /**
     * @private
     * @memberOf {Parser}
     * @method
     *
     * @param {String} s
     *
     * @returns {String}
     * */
    __tokenize: function (s) {

        if (this.params.strictSpaces) {

            return s.replace(/\\([\s\S])/g, '$1');
        }

        return s.trimLeft().replace(/\\([\s\S])|\s+$/g, '$1');
    }

});

module.exports = Parser;
