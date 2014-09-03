/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

describe('core/util/to-index', function () {
    /*eslint max-nested-callbacks: 0*/
    var toIndex = require('../core/util/to-index');

    var header = 'Should parse "%s" to %d';
    var samples = [
        [
            '',
            NaN
        ],
        [
            ' ',
            NaN
        ],
        [
            '1.42',
            NaN
        ],
        [
            '1',
            1
        ],
        [
            '01',
            1
        ],
        [
            '010',
            8
        ],
        [
            '-010',
            -8
        ],
        [
            '+010',
            8
        ],
        [
            ' - 010 ',
            -8
        ],
        [
            ' + 010',
            8
        ],
        [
            ' - 0xFF',
            -255
        ],
        [
            '0xFF ',
            255
        ],
        [
            ' 42 ',
            42
        ],
        [
            ' 999999999999999999999999999999',
            NaN
        ]
    ];

    _.forEach(samples, function (s) {
        var title = util.format(header, s[0], s[1]);
        it(title, function () {
            var actual = toIndex(s[0]);

            if (_.isNaN(s[1])) {
                assert.ok(_.isNaN(actual));

            } else {
                assert.strictEqual(actual, s[1]);
            }

        });

    });

});
