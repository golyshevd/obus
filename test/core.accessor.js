/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

describe('core/accessor', function () {
    /*eslint max-nested-callbacks: 0*/
    var Accessor = require('../core/accessor');

    describe('{Accessor}.get', function () {
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
            ]
        ];
        var header = 'new Accessor(%j).get(%j, %j) should return %j';

        _.forEach(samples, function (sample) {
            var title = util.format(header, sample[0][0], sample[0][1], sample[0][2], sample[1]);
            it(title, function () {
                assert.deepEqual(new Accessor(sample[0][0]).get(sample[0][1], sample[0][2]), sample[1]);
            });
        });

    });

});
