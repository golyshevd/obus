'use strict';

var _ = require('lodash-node');

function getKey(root, part) {
    var type = part.type;
    var k = part.part;

    if (type !== 'PART' || !_.isArray(root)) {

        return k;
    }

    k = part.index;

    if (_.isNaN(k)) {

        return part.part;
    }

    if (k < 0) {
        k = root.length + k;
    }

    if (k < 0) {

        return part.part;
    }

    return k;
}

module.exports = getKey;
