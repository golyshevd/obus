/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

describe('core/accessor', function () {
    /*eslint max-nested-callbacks: 0*/
    var Accessor = require('../core/accessor');

    describe('{Accessor}.get', function () {
        var header = 'new Accessor(%j).get(%j, %j) should return %j';
        var samples = [
            [
                [
                    {},
                    'a',
                    42
                ],
                42
            ],
            [
                [
                    {a: 42},
                    'a',
                    100500
                ],
                42
            ],
            [
                [
                    {a: {b: 42}},
                    'a.b',
                    100500
                ],
                42
            ],
            [
                [
                    {a: {b: 42}},
                    'a[b]',
                    100500
                ],
                42
            ],
            [
                [
                    null,
                    'a',
                    100500
                ],
                100500
            ],
            [
                [
                    {a: 42},
                    'a.b',
                    100500
                ],
                100500
            ],
            [
                [
                    {a: [1, 2]},
                    'a[0]',
                    100500
                ],
                1
            ],
            [
                [
                    {a: [1, 2]},
                    'a[]',
                    100500
                ],
                100500
            ],
            [
                [
                    {a: [1, 2]},
                    'a[-1]',
                    100500
                ],
                2
            ],
            [
                [
                    {a: [1, 2]},
                    'a.-1',
                    100500
                ],
                100500
            ],
            [
                [
                    [1, 2],
                    '[-1]',
                    100500
                ],
                2
            ],
            [
                [
                    [1, 2],
                    '[-2]',
                    100500
                ],
                1
            ],
            [
                [
                    (function () {
                        var a = [1, 2];

                        a['-3'] = 42;

                        return a;
                    }()),
                    '[-3]',
                    100500
                ],
                42
            ],
            [
                [
                    {a: [1, {b: 42}]},
                    'a[-1].b',
                    100500
                ],
                42
            ]
        ];

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0][0], s[0][1], s[0][2], s[1]);
            it(title, function () {
                assert.deepEqual(new Accessor(s[0][0]).get(s[0][1], s[0][2]), s[1]);
            });
        });

    });

    describe('{Accessor}.has', function () {
        var header = 'new Accessor(%j).has(%j) should return %j';
        var samples = [
            [
                {a: 42},
                'a',
                true
            ],
            [
                {a: 42},
                'a.b',
                false
            ],
            [
                {a: [1, 2]},
                'a[0]',
                true
            ],
            [
                {a: [1, 2]},
                'a[1]',
                true
            ],
            [
                {a: [1, 2]},
                'a[-1]',
                true
            ],
            [
                {a: [1, 2]},
                'a[-2]',
                true
            ],
            [
                {a: [1, 2]},
                'a[3]',
                false
            ],
            [
                {a: [1, 2]},
                'a[-3]',
                false
            ],
            [
                {a: [1, {b: 42}]},
                'a[-1].b',
                true
            ]
        ];

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);

            it(title, function () {
                assert.strictEqual(new Accessor(s[0]).has(s[1]), s[2]);
            });
        });
    });
});
