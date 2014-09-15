/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

/*eslint no-extend-native: 0*/
Object.prototype.bug = 42;

describe('core/parser', function () {
    /*eslint max-nested-callbacks: 0*/
    var Obus = require('../core/obus');

    describe('Obus.parse', function () {

        var samples = [
            ['a.b', ['a', 'b']],
            ['', []],
            ['a\\.b', ['a.b']]
        ];

        var header = 'Obus.parse(%j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, null, s[0], s[1]);

            it(title, function () {
                assert.deepEqual(Obus.parse(s[0]), s[1]);
            });
        });
    });

    describe('Obus.escape', function () {

        var samples = [
            [
                'a',
                'a'
            ],
            [
                'a.b',
                'a\\.b'
            ],
            [
                '\\ ',
                '\\\\ '
            ]
        ];

        var header = 'Obus.escape(%j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, null, s[0], s[1]);

            it(title, function () {
                assert.deepEqual(Obus.escape(s[0]), s[1]);
            });
        });
    });

    describe('{Obus}.get', function () {
        var samples = [
            [
                {},
                'a.b',
                42,
                42
            ],
            [
                {},
                'a.b',
                void 0,
                void 0
            ],
            [
                {a: void 0},
                'a',
                42,
                42
            ],
            [
                {a: 42},
                'a',
                void 0,
                42
            ]
        ];

        var header = 'new Obus(%j).get(%j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.get(s[1], s[2]), s[3]);
            });
        });
    });

    describe('{Obus}.has', function () {
        var samples = [
            [
                {},
                'a',
                false
            ],
            [
                {a: void 0},
                'a',
                false
            ],
            [
                {a: 42},
                'a',
                true
            ]
        ];

        var header = 'new Obus(%j).has(%j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.has(s[1]), s[2]);
            });
        });
    });

    describe('{Obus}.set', function () {
        var samples = [
            [
                {},
                'a.b',
                42,
                {a: {b: 42}}
            ],
            [
                {a: 42},
                'a.b',
                42,
                {a: {b: 42}}
            ],
            [
                {a: {}},
                'a.b',
                42,
                {a: {b: 42}}
            ]
        ];

        var header = 'new Obus(%j).set(%j, %j).valueOf() should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.set(s[1], s[2]).valueOf(), s[3]);
            });
        });
    });

    describe('{Obus}.extend', function () {
        var samples = [
            [
                {},
                'a.b',
                {c: 43},
                {a: {b: {c: 43}}}
            ],
            [
                {a: {b: 42}},
                'a.b',
                {c: 43},
                {a: {b: {c: 43}}}
            ],
            [
                {a: {b: {c: 42}}},
                'a.b',
                {d: 43},
                {a: {b: {c: 42, d: 43}}}
            ]
        ];

        var header = 'new Obus(%j).extend(%j, %j).valueOf() should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.extend(s[1], s[2]).valueOf(), s[3]);
            });
        });
    });

    describe('{Obus}.push', function () {
        var samples = [
            [
                {},
                'a.b.c',
                42,
                {a: {b: {c: 42}}}
            ],
            [
                {a: {b: {c: 42}}},
                'a.b.c',
                43,
                {a: {b: {c: [42, 43]}}}
            ],
            [
                {a: {b: {c: [42, 43]}}},
                'a.b.c',
                44,
                {a: {b: {c: [42, 43, 44]}}}
            ]
        ];

        var header = 'new Obus(%j).push(%j, %j).valueOf() should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.push(s[1], s[2]).valueOf(), s[3]);
            });
        });
    });

    describe('{Obus}.del', function () {
        var samples = [
            [
                {a: {b: 42}},
                'a.b',
                true
            ],
            [
                {a: {b: 42}},
                'a.b.c',
                false
            ],
            [
                {},
                'a.b.c',
                false
            ]
        ];

        var header = 'new Obus(%j).del(%j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);
            var obus = new Obus(s[0]);

            it(title, function () {
                assert.deepEqual(obus.del(s[1]), s[2]);
            });
        });
    });

});
