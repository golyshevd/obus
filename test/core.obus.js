/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('assert');
var util = require('util');

/*eslint no-extend-native: 0*/
Object.prototype.bug = 42;

describe('core/parser', function () {
    /*eslint max-nested-callbacks: 0*/
    var Obus = require('../core/obus');

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

            it(title, function () {
                var obus = new Obus();
                obus.set(void 0, s[0]);
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
                true
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

            it(title, function () {
                var obus = new Obus();
                obus.set(void 0, s[0]);
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
            ],
            [
                {a: 42},
                void 0,
                {b: 54},
                {b: 54}
            ]
        ];

        var header = 'new Obus(%j).set(%j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);

            it(title, function () {
                var obus = new Obus();
                obus.set(void 0, s[0]);
                obus.set(s[1], s[2]);
                assert.deepEqual(obus, s[3]);
            });
        });
    });

    describe('{Obus}.add', function () {
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
            ],
            [
                {},
                void 0,
                {a: 42},
                {a: 42}
            ]
        ];

        var header = 'new Obus(%j).add(%j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);

            it(title, function () {
                var obus = new Obus();
                obus.set(void 0, s[0]);
                obus.add(s[1], s[2]);
                assert.deepEqual(obus, s[3]);
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
            ],
            [
                {},
                void 0,
                false
            ]
        ];

        var header = 'new Obus(%j).del(%j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);

            it(title, function () {
                var obus = new Obus();
                obus.set(void 0, s[0]);
                assert.deepEqual(obus.del(s[1]), s[2]);
            });
        });
    });

});
