/*global describe, it*/
'use strict';

var assert = require('chai').assert;

describe('core/util/cache', function () {
    /*eslint max-nested-callbacks: 0*/
    var Cache = require('../core/util/cache');

    it('Should drop entries if too many', function () {
        var c = new Cache(2);

        c.set('x', 42);
        assert.strictEqual(c.get('x'), 42);

        c.set('x', 43);
        assert.strictEqual(c.get('x'), 43);

        c.set('y', 54);
        assert.strictEqual(c.get('x'), 43);
        assert.strictEqual(c.get('y'), 54);

        c.set('z', 146);
        assert.strictEqual(c.get('x'), void 0);
        assert.strictEqual(c.get('y'), 54);
        assert.strictEqual(c.get('z'), 146);
    });

});
