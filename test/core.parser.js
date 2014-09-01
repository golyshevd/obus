/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

describe('core/parser', function () {
    /*eslint max-nested-callbacks: 0*/
    var Parser = require('../core/parser');

    describe('Parser', function () {
        it('Should be an instance of Parser', function () {
            var parser = new Parser();

            assert.instanceOf(parser, Parser);
        });

        it('Should support params', function () {
            var parser = new Parser();

            assert.isObject(parser.params);
            parser = new Parser({
                trimTokens: true
            });

            assert.deepEqual(parser.params, {
                trimTokens: true
            });
        });
    });

    describe('{Parser}.splitPath', function () {
        var header = 'Should parse "%s" to %j (params=%j)';
        var samples = [
            [
                '',
                []
            ],
            [
                '..',
                ['', '', '']
            ],
            [
                'a.b.c',
                ['a', 'b', 'c']
            ],
            [
                'a\\.b.c',
                ['a\\.b', 'c']
            ],
            [
                'a.b[c]d',
                ['a', 'b[c]d']
            ],
            [
                'a.b[c.d]e',
                ['a', 'b[c.d]e']
            ],
            [
                'a.b[[[c.d]e',
                ['a', 'b[[[c.d]e']
            ],
            [
                'a.b[[[c].d]e',
                ['a', 'b[[[c]', 'd]e']
            ],
            [
                'a.b[[[c\\].d]e',
                ['a', 'b[[[c\\].d]e']
            ],
            [
                'a.b\\[c.d]e',
                ['a', 'b\\[c', 'd]e']
            ],
            [
                '.a.b[c]d',
                ['', 'a', 'b[c]d']
            ],
            [
                '].].].',
                [']', ']', ']', '']
            ],
            [
                'a.b[.',
                ['a', 'b[.']
            ],
            [
                'a.b[.].c',
                ['a', 'b[.]', 'c']
            ],
            [
                'a\\',
                ['a\\']
            ]
        ];

        _.forEach(samples, function (sample) {
            var title = util.format(header, sample[0], sample[1], sample[2]);

            it(title, function () {
                var parser = new Parser(sample[2]);
                assert.deepEqual(parser.splitPath(sample[0]), sample[1]);
            });
        });
    });
    describe('{Parser}.parsePart', function () {
        var header = 'Should parse "%s" to %j (params=%j)';
        var samples = [
            [
                'a[b]',
                ['a', 'b']
            ],
            [
                'a[b][c]',
                ['a', 'b', 'c']
            ],
            [
                'a[b][c',
                ['a[b][c']
            ],
            [
                'a[][]',
                ['a', '', '']
            ],
            [
                '[][]',
                ['', '', '']
            ],
            [
                '[[a][b]',
                ['', '[a', 'b']
            ],
            [
                '[[a]][b]',
                ['[[a]]', 'b']
            ],
            [
                ']]][a][b]',
                [']]]', 'a', 'b']
            ],
            [
                ']]][a\\][b]',
                [']]]', 'a][b']
            ],
            [
                '',
                ['']
            ],
            [
                '[]',
                ['', '']
            ],
            [
                '[][',
                ['[][']
            ],
            [
                'a',
                ['a']
            ],
            [
                '[] []',
                ['[] ', '']
            ],
            [
                'a[b] [c]',
                ['a[b] ', 'c']
            ],
            [
                'a[b] [c] ',
                ['a[b] [c] ']
            ],
            [
                'a[b] [c] [d]',
                ['a[b] [c] ', 'd']
            ],
            [
                'a\\',
                ['a\\']
            ],
            [
                'a[b]][d]',
                ['a[b]]', 'd']
            ]
        ];

        _.forEach(samples, function (sample) {
            var title = util.format(header, sample[0], sample[1], sample[2]);

            it(title, function () {
                var parser = new Parser(sample[2]);
                assert.deepEqual(parser.parsePart(sample[0]), sample[1]);
            });
        });
    });

    describe('{Parser}.parsePath', function () {
        var header = 'Should parse "%s" to %j (params=%j)';

        var samples = [
            [
                '',
                []
            ],
            [
                'a',
                ['a']
            ],
            [
                'a.b.c',
                ['a', 'b', 'c']
            ],
            [
                'a . b . c',
                ['a ', ' b ', ' c']
            ],
            [
                'a \\. b \\. c',
                ['a . b . c']
            ],
            [
                'a.b.c.',
                ['a', 'b', 'c', '']
            ],
            [
                'a[b]',
                ['a', 'b']
            ],
            [
                '[a].b',
                ['a', 'b']
            ],
            [
                'a.b[c].d',
                ['a', 'b', 'c', 'd']
            ],
            [
                'a.b[c.d].e',
                ['a', 'b', 'c.d', 'e']
            ],
            [
                'a.b[c[].d',
                ['a', 'b', 'c[', 'd']
            ],
            [
                '[a] [b]',
                ['[a] ', 'b']
            ],
            [
                '[] []',
                ['[] ', '']
            ],
            [
                '[ ] [ ]',
                ['[ ] ', ' ']
            ],
            [
                '[].a',
                ['', 'a']
            ],
            [
                '[] .a',
                ['[] ', 'a']
            ],
            [
                ' [] .a',
                [' [] ', 'a']
            ],
            [
                '...',
                ['', '', '', '']
            ],
            [
                '[a].b.[c]',
                ['a', 'b', '', 'c']
            ],
            [
                '[a].b.c[d].e[f]',
                ['a', 'b', 'c', 'd', 'e', 'f']
            ],
            [
                '].a]][b]',
                [']', 'a]]', 'b']
            ],
            [
                'a\\',
                ['a\\']
            ],
            [
                'a[[',
                ['a[[']
            ],
            [
                'a[b][c',
                ['a[b][c']
            ],
            [
                '[a]b[c]',
                ['[a]b', 'c']
            ],
            [
                '\\[a\\]\\.b',
                ['[a].b']
            ],
            [
                '[a].b',
                ['a', 'b']
            ],
            [
                '[].',
                ['', '']
            ],
            [
                '[a]b.c',
                ['[a]b', 'c']
            ],
            [
                '[a][',
                ['[a][']
            ],
            [
                '[',
                ['[']
            ],
            [
                '.',
                ['', '']
            ],
            [
                '\\.',
                ['.']
            ],
            [
                '[a\\]',
                ['[a]']
            ],
            [
                '\\[a].b',
                ['[a]', 'b']
            ],
            [
                '[a] [b].c.d[e]',
                ['[a] ', 'b', 'c', 'd', 'e']
            ],
            [
                'a.b[c] [d]',
                ['a', 'b[c] ', 'd']
            ],
            [
                'a.b[c] [d]e',
                ['a', 'b[c] [d]e']
            ],
            [
                '[a][b][c]d',
                ['[a][b][c]d']
            ],
            [
                '[a].b[c] [d] .e',
                ['a', 'b[c] [d] ', 'e']
            ],
            [
                '[a.b]',
                ['a.b']
            ],
            [
                '[a.b',
                ['[a.b']
            ]
        ];

        _.forEach(samples, function (sample) {
            var title = util.format(header, sample[0], sample[1], sample[2]);

            it(title, function () {
                var parser = new Parser(sample[2]);
                assert.deepEqual(parser.parsePath(sample[0]), sample[1]);
            });
        });
    });

});
