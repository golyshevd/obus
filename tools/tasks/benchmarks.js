'use strict';

module.exports = function () {

    this.task('benchmark', ['unit'], function (done) {
        /*eslint no-console: 0*/
        var Benchmark = require('benchmark').Benchmark;
        var Suite = Benchmark.Suite;
        var Obus = require('../../');
        var suite = new Suite();

        suite.add('Obus.get', function () {
            var root = {a: {b: {c: {d: {}}}}};
            Obus.get(root, 'a.b.c.d');
            Obus.get(root, 'a.b.c.d.e');
            Obus.get(root, 'a.b.c.d.e.f');
        });

        suite.add('Obus.has', function () {
            var root = {a: {b: {c: {d: {}}}}};
            Obus.has(root, 'a.b.c.d.e');
            Obus.has(root, 'a.b.c.d.e.f');
            Obus.has(root, 'a.b.c.d.e.f.g');
        });

        suite.add('Obus.set', function () {
            var root = {};
            Obus.set(root, 'a.b.c.x.e', 42);
            Obus.set(root, 'a.b.c.y.e', 42);
            Obus.set(root, 'a.b.c.z.e', 42);
        });

        suite.add('Obus.add', function () {
            var root = {};
            Obus.add(root, '_.a.b.c.x.e', 42);
            Obus.add(root, '_.a.b.c.y.e', 42);
            Obus.add(root, '_.a.b.c.z.e', 42);
        });

        suite.on('cycle', function (event) {
            console.log(String(event.target));
        });

        suite.on('complete', function () {
            console.log();
            done();
        });

        suite.run({
            queued: true,
            async: true
        });
    });
};
