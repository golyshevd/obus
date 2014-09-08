/*global describe, it*/
'use strict';

var _ = require('lodash-node');
var assert = require('chai').assert;
var util = require('util');

describe('core/parser', function () {
    /*eslint max-nested-callbacks: 0*/
    var Parser = require('../core/parser');

    describe('Parser', function () {
        var header = 'Should parse "%s" to %j (params=%j)';

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
                        index: NaN,
                        part: 'b'
                    }
                ]
            ],
            [
                '[a].b',
                [
                    {
                        type: 'PART',
                        index: NaN,
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
                        index: NaN,
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
                        index: NaN,
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
                        index: NaN,
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
                        index: NaN,
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        index: NaN,
                        part: 'b'
                    }
                ]
            ],
            [
                '[] \t[]',
                [
                    {
                        type: 'PART',
                        index: NaN,
                        part: ''
                    },
                    {
                        type: 'PART',
                        index: NaN,
                        part: ''
                    }
                ]
            ],
            [
                '[ ] [ ]',
                [
                    {
                        type: 'PART',
                        index: NaN,
                        part: ''
                    },
                    {
                        type: 'PART',
                        index: NaN,
                        part: ''
                    }
                ]
            ],
            [
                '[].a',
                [
                    {
                        type: 'PART',
                        part: '',
                        index: NaN
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
                        part: '',
                        index: NaN
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
                        part: '',
                        index: NaN
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
                        part: 'a',
                        index: NaN
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
                        part: 'c',
                        index: NaN
                    }
                ]
            ],
            [
                '[a].b.c[d].e[f]',
                [
                    {
                        type: 'PART',
                        part: 'a',
                        index: NaN
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
                        part: 'd',
                        index: NaN
                    },
                    {
                        type: 'ROOT',
                        part: 'e'
                    },
                    {
                        type: 'PART',
                        part: 'f',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'c',
                        index: NaN
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
                        part: 'a',
                        index: NaN
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
                        part: '',
                        index: NaN
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
                        part: 'a',
                        index: NaN
                    },
                    {
                        type: 'PART',
                        part: 'b',
                        index: NaN
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
                        part: 'e',
                        index: NaN
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
                        part: 'c',
                        index: NaN
                    },
                    {
                        type: 'PART',
                        part: 'd',
                        index: NaN
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
                        part: 'a',
                        index: NaN
                    },
                    {
                        type: 'ROOT',
                        part: 'b'
                    },
                    {
                        type: 'PART',
                        part: 'c',
                        index: NaN
                    },
                    {
                        type: 'PART',
                        part: 'd',
                        index: NaN
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
                        part: 'a.b',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'b',
                        index: NaN
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
                        part: 'a',
                        index: NaN
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
            ],
            [
                'a[b] c [d]',
                [
                    {
                        type: 'ROOT',
                        part: 'a[b] c'
                    },
                    {
                        type: 'PART',
                        part: 'd',
                        index: NaN
                    }
                ]
            ],
            [
                'a[ b ]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: 'b',
                        index: NaN
                    }
                ]
            ],
            [
                'a[\\ b ]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: ' b',
                        index: NaN
                    }
                ]
            ],
            //  STRICT SPACES
            [
                ' a . b ',
                [
                    {
                        type: 'ROOT',
                        part: ' a '
                    },
                    {
                        type: 'ROOT',
                        part: ' b '
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                '\\ a\\ .\\ b ',
                [
                    {
                        type: 'ROOT',
                        part: ' a '
                    },
                    {
                        type: 'ROOT',
                        part: ' b '
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                'a[ b ]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: ' b ',
                        index: NaN
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ]',
                [
                    {
                        type: 'ROOT',
                        part: ' a '
                    },
                    {
                        type: 'PART',
                        part: ' b ',
                        index: NaN
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ] ',
                [
                    {
                        type: 'ROOT',
                        part: ' a [ b ] '
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ][ c ]',
                [
                    {
                        type: 'ROOT',
                        part: ' a '
                    },
                    {
                        type: 'PART',
                        part: ' b ',
                        index: NaN
                    },
                    {
                        type: 'PART',
                        part: ' c ',
                        index: NaN
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ] [ c ]',
                [
                    {
                        type: 'ROOT',
                        part: ' a [ b ] '
                    },
                    {
                        type: 'PART',
                        part: ' c ',
                        index: NaN
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ] [ c ] ',
                [
                    {
                        type: 'ROOT',
                        part: ' a [ b ] [ c ] '
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ] .c',
                [
                    {
                        type: 'ROOT',
                        part: ' a [ b ] '
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                ' a [ b ].c',
                [
                    {
                        type: 'ROOT',
                        part: ' a '
                    },
                    {
                        type: 'PART',
                        part: ' b ',
                        index: NaN
                    },
                    {
                        type: 'ROOT',
                        part: 'c'
                    }
                ],
                {
                    strictSpaces: true
                }
            ],
            [
                'a[1]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: '1',
                        index: 1
                    }
                ]
            ],
            [
                'a[\\1]',
                [
                    {
                        type: 'ROOT',
                        part: 'a'
                    },
                    {
                        type: 'PART',
                        part: '1',
                        index: NaN
                    }
                ]
            ]
        ];

        _.forEach(samples, function (s) {
            var parser = new Parser(s[0], s[2]);
            var title = util.format(header, s[0], s[1], parser.params);

            it(title, function () {
                assert.deepEqual(parser.parts, s[1]);
            });
        });
    });

});
