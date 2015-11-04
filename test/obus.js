/*global describe, it*/
'use strict';

var _ = require('lodash');
var assert = require('assert');
var util = require('util');

/*eslint no-extend-native: 0*/
Object.prototype.bug = 42;

describe('obus', function () {
    /*eslint max-nested-callbacks: 0*/
    var Obus = require('../obus');

    describe('Obus', function () {
        it('Should be an instance of Obus', function () {
            assert.ok(new Obus() instanceof Obus);
        });
    });

    function getF(k, v) {
        function f() {}
        f[k] = v;

        return f;
    }

    describe('Obus.parse', function () {
        var parse = Obus.parse;
        var samples = [
            [
                '',
                []
            ],
            [
                '       ',
                []
            ],
            [
                ' foo ',
                ['foo']
            ],
            [
                'foo',
                ['foo']
            ],
            [
                '.foo',
                ['foo']
            ],
            [
                '[42]',
                [42]
            ],
            [
                '  [  42  ]  ',
                [42]
            ],
            [
                '  [  "42"  ]  ',
                ['42']
            ],
            [
                '  [  \'42\'  ]  ',
                ['42']
            ],
            [
                '.foo[42]',
                ['foo', 42]
            ],
            [
                '_$Identity',
                ['_$Identity']
            ],
            [
                'foo["\'"]',
                ['foo', '\'']
            ],
            [
                '["\\""]',
                ['"']
            ]
        ];

        _.forEach(samples, function (s) {
            var shouldText = util.format('Should parse %j to %j', s[0], s[1]);

            it(shouldText, function () {
                assert.deepEqual(parse(s[0]), s[1]);
            });
        });

        describe('parse errors', function () {
            var errors = [
                '.',
                '[]',
                '[\'"]',
                '["\']',
                '["foo"',
                '[',
                '1123',
                'foo-bar'
            ];

            _.forEach(errors, function (s) {
                var shouldText = util.format('Should throw SyntaxError on %j', s);

                it(shouldText, function () {
                    assert.throws(function () {
                        return parse(s);
                    });
                });
            });
        });
    });

    describe('Obus.get', function () {
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
            ],
            [
                getF('foo', 'bar'),
                'foo',
                void 0,
                'bar'
            ]
        ];

        var header = 'Obus.get(%j, %j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);

            it(title, function () {
                assert.deepEqual(Obus.get(s[0], s[1], s[2]), s[3]);
            });
        });
    });

    describe('Obus.has', function () {
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
            ],
            [
                getF('foo', 'bar'),
                'foo',
                true
            ]
        ];

        var header = 'Obus.has(%j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);

            it(title, function () {
                assert.deepEqual(Obus.has(s[0], s[1]), s[2]);
            });
        });
    });

    describe('Obus.set', function () {
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

        var header = 'Obus.set(%j, %j, %j), %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);

            it(title, function () {
                Obus.set(s[0], s[1], s[2]);
                assert.deepEqual(s[0], s[3]);
            });
        });

        it('Should support function root', function () {
            var obj = {foo: function () {}};
            Obus.set(obj, 'foo.bar', 42);
            assert.strictEqual(typeof obj.foo, 'function');
            assert.strictEqual(obj.foo.bar, 42);
        });
    });

    describe('Obus.add', function () {
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

        var header = 'Obus.add(%j, %j, %j), %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2], s[3]);

            it(title, function () {
                Obus.add(s[0], s[1], s[2]);
                assert.deepEqual(s[0], s[3]);
            });
        });

        it('Should support function root', function () {
            var obj = {foo: function () {}};
            Obus.add(obj, 'foo.bar', 42);
            assert.strictEqual(typeof obj.foo, 'function');
            assert.strictEqual(obj.foo.bar, 42);
            Obus.add(obj, 'foo', {
                baz: 42
            });
            assert.strictEqual(obj.foo.baz, 42);
        });
    });

    describe('Obus.del', function () {
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
                true
            ],
            [
                {x: 42},
                void 0,
                true
            ]
        ];

        var header = 'Obus.del(%j, %j) should return %j';

        _.forEach(samples, function (s) {
            var title = util.format(header, s[0], s[1], s[2]);

            it(title, function () {
                assert.deepEqual(Obus.del(s[0], s[1]), s[2]);
            });
        });

        it('Should support function root', function () {
            var obj = {foo: getF('bar', 'baz')};
            assert.ok(Obus.del(obj, 'foo.bar'), true);
            assert.strictEqual(obj.foo.bar, void 0);
        });
    });

    it('Should have proto accessors', function () {
        var o = new Obus();
        o.add('foo.bar.baz', 42);
        assert.strictEqual(o.foo.bar.baz, 42);

        assert.ok(o.del('foo.bar.baz'));
        assert.ok(!o.has('foo.bar.baz'));
        assert.strictEqual(o.get('foo.bar'), o.foo.bar);
        var fooBar = o.foo.bar;
        o.set('foo.bar', {});
        assert.ok(o.foo.bar);
        assert.notStrictEqual(o.foo.bar, fooBar);
        assert.ok(o.has('foo.bar'));
    });

    describe('Obus.format', function () {
        var samples = [
            '.foo.bar',
            '[1][2].foo',
            '[\'foo-bar\']',
            '[\'foo\\\'-bar\']'
        ];

        samples.forEach(function (s) {
            it(util.format('Should format %j to %s', Obus.parse(s), s), function () {
                assert.strictEqual(Obus.format(Obus.parse(s)), s);
            });
        });
    });
});
