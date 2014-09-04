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
    });

    describe('Parser.parse', function () {
        var header = 'Should parse "%s" to %j';

        var samples = [
            [
                '',
                []
            ],
            [
                ' ',
                []
            ],
            [
                '\\ \\ \\ ',
                [
                    {
                        type: 'ROOT',
                        part: '   '
                    }
                ]
            ],
            [
                'a',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    }
                ]
            ],
            [
                ' a ',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    }
                ]
            ],
            [
                ' \\ a ',
                [
                    {
                        type: 'ROOT',
                        part: ' a'
                    }
                ]
            ],
            [
                'a.b.c',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    }
                ]
            ],
            [
                'a \\. b \\. c',
                [
                    {
                        type: 'ROOT',
                        part: 'a . b . c'
                    }
                ]
            ],
            [
                'a.b.c.',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    }
                ]
            ],
            [
                'a[b]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a].b',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    }
                ]
            ],
            [
                'a.b[c].d',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c'
                    },
                    {
                        type: 'ROOT',
                        part: 'd'
                    }
                ]
            ],
            [
                'a.b[c.d].e',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c.d'
                    },
                    {
                        type: 'ROOT',
                        part: 'e'
                    }
                ]
            ],
            [
                'a.b[c[].d',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c['
                    },
                    {
                        type: 'ROOT',
                        part: 'd'
                    }
                ]
            ],
            [
                '[a] [b]',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[] \t[]',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'PART',
                        part: ''
                    }
                ]
            ],
            [
                '[ ] [ ]',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'PART',
                        part: ''
                    }
                ]
            ],
            [
                '[].a',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: 'a'
                    }
                ]
            ],
            [
                '[] .a',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: 'a'
                    }
                ]
            ],
            [
                ' [] .a',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: 'a'
                    }
                ]
            ],
            [
                '...',
                [
                    {
                        type: 'ROOT',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    }
                ]
            ],
            [
                '[a].b.[c]',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    },
                    {
                        type: 'PART',
                        part: 'c'
                    }
                ]
            ],
            [
                '[a].b.c[d].e[f]',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    },
                    {
                        type: 'PART',
                        part: 'd'
                    },
                    {
                        type: 'ROOT',
                        part: 'e'
                    },
                    {
                        type: 'PART',
                        part: 'f'
                    }
                ]
            ],
            [
                '].a]][b]',
                [
                    {
                        type: 'ROOT',
                        part: ']'
                    },
                    {
                        type: 'ROOT',
                        part: 'a]]'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                'a\\',
                [
                    {
                        type: 'ROOT',
                        part: 'a\\'
                    }
                ]
            ],
            [
                'a[[',
                [
                    {
                        type: 'ROOT',
                        part: 'a[['
                    }
                ]
            ],
            [
                'a[b][c',
                [
                    {
                        type: 'ROOT',
                        part: 'a[b][c'
                    }
                ]
            ],
            [
                '[a]b[c]',
                [
                    {
                        type: 'ROOT',
                        part: '[a]b'
                    },
                    {
                        type: 'PART',
                        part: 'c'
                    }
                ]
            ],
            [
                '\\[a\\]\\.b',
                [
                    {
                        type: 'ROOT',
                        part: '[a].b'
                    }
                ]
            ],
            [
                '[a].b',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    }
                ]
            ],
            [
                '[].',
                [
                    {
                        type: 'PART',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    }
                ]
            ],
            [
                '[a]b.c',
                [
                    {
                        type: 'ROOT',
                        part: '[a]b'
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    }
                ]
            ],
            [
                '[a][',
                [
                    {
                        type: 'ROOT',
                        part: '[a]['
                    }
                ]
            ],
            [
                '[',
                [
                    {
                        type: 'ROOT',
                        part: '['
                    }
                ]
            ],
            [
                '.',
                [
                    {
                        type: 'ROOT',
                        part: ''
                    },
                    {
                        type: 'ROOT',
                        part: ''
                    }
                ]
            ],
            [
                '\\.',
                [
                    {
                        type: 'ROOT',
                        part: '.'
                    }
                ]
            ],
            [
                '[a\\]',
                [
                    {
                        type: 'ROOT',
                        part: '[a]'
                    }
                ]
            ],
            [
                '\\[a].b',
                [
                    {
                        type: 'ROOT',
                        part: '[a]'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a] [b].c.d[e]',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    },
                    {
                        type: 'ROOT',
                        part: 'd'
                    },
                    {
                        type: 'PART',
                        part: 'e'
                    }
                ]
            ],
            [
                'a.b[c] [d]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c'
                    },
                    {
                        type: 'PART',
                        part: 'd'
                    }
                ]
            ],
            [
                'a.b[c] [d]e',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b[c] [d]e'
                    }
                ]
            ],
            [
                '[a][b][c]d',
                [
                    {
                        type: 'ROOT',
                        part: '[a][b][c]d'
                    }
                ]
            ],
            [
                '[a].b[c] [d] .e',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c'
                    },
                    {
                        type: 'PART',
                        part: 'd'
                    },
                    {
                        type: 'ROOT',
                        part: 'e'
                    }
                ]
            ],
            [
                '[a.b]',
                [
                    {
                        type: 'PART',
                        part: 'a.b'
                    }
                ]
            ],
            [
                '[a.b',
                [
                    {
                        type: 'ROOT',
                        part: '[a.b'
                    }
                ]
            ],
            [
                'a[b]]',
                [
                    {
                        type: 'ROOT',
                        part: 'a[b]]'
                    }
                ]
            ],
            [
                ' a\\ ',
                [
                    {
                        type: 'ROOT',
                        part: 'a '
                    }
                ]
            ],
            [
                '[a]\\ [b]',
                [
                    {
                        type: 'ROOT',
                        part: '[a] '
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a]\\  [b]',
                [
                    {
                        type: 'ROOT',
                        part: '[a] '
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a]\\  \\ [b]',
                [
                    {
                        type: 'ROOT',
                        part: '[a]   '
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a]x[b]',
                [
                    {
                        type: 'ROOT',
                        part: '[a]x'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a]xx[b]',
                [
                    {
                        type: 'ROOT',
                        part: '[a]xx'
                    },
                    {
                        type: 'PART',
                        part: 'b'
                    }
                ]
            ],
            [
                '[a]x',
                [
                    {
                        type: 'ROOT',
                        part: '[a]x'
                    }
                ]
            ],
            [
                ' [a] ',
                [
                    {
                        type: 'PART',
                        part: 'a'
                    }
                ]
            ],
            [
                ' [a] \\ ',
                [
                    {
                        type: 'ROOT',
                        part: '[a]  '
                    }
                ]
            ],
            [
                ' a  \\  ',
                [
                    {
                        type: 'ROOT',
                        part: 'a   '
                    }
                ]
            ],
            [
                ' a  \\ ',
                [
                    {
                        type: 'ROOT',
                        part: 'a   '
                    }
                ]
            ],
            [
                '[a]  b ',
                [
                    {
                        type: 'ROOT',
                        part: '[a]  b'
                    }
                ]
            ],
            [
                '[a]\\ ',
                [
                    {
                        type: 'ROOT',
                        part: '[a] '
                    }
                ]
            ]
        ];

        _.forEach(samples, function (sample) {
            var title = util.format(header, sample[0], sample[1]);

            it(title, function () {
                var parts = Parser.parse(sample[0]);

                assert.deepEqual(parts, sample[1]);
            });
        });
    });

});
