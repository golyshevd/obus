'use strict';

// eslint 2.9.0

function e(opts) {
    return v('error', opts);
}

function w(opts) {
    return v('warn', opts);
}

function off() {
    return v('off');
}

function v(level, opts) {
    if (!opts) {
        opts = [];
    }

    return [level].concat(opts);
}

module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'script',
        ecmaVersion: 6,
        ecmaFeatures: {}
    },
    env: {
        node: true,
        commonjs: true
    },

    rules: {
        //  http://eslint.org/docs/rules/#possible-errors
        'comma-dangle': e(['never']),               // http://eslint.org/docs/rules/comma-dangle
        'no-cond-assign': e(),                      // http://eslint.org/docs/rules/no-cond-assign
        'no-console': e(),                          // http://eslint.org/docs/rules/no-console
        'no-constant-condition': e(),               // http://eslint.org/docs/rules/no-constant-condition
        'no-control-regex': e(),                    // http://eslint.org/docs/rules/no-control-regex
        'no-debugger': e(),                         // http://eslint.org/docs/rules/no-debugger
        'no-dupe-args': e(),                        // http://eslint.org/docs/rules/no-dupe-args
        'no-dupe-keys': e(),                        // http://eslint.org/docs/rules/no-dupe-keys
        'no-duplicate-case': e(),                   // http://eslint.org/docs/rules/no-duplicate-case
        'no-empty': e(),                            // http://eslint.org/docs/rules/no-empty
        'no-empty-character-class': e(),            // http://eslint.org/docs/rules/no-empty-character-class
        'no-ex-assign': e(),                        // http://eslint.org/docs/rules/no-ex-assign
        'no-extra-boolean-cast': e(),               // http://eslint.org/docs/rules/no-extra-boolean-cast
        'no-extra-parens': e(),                     // http://eslint.org/docs/rules/no-extra-parens
        'no-extra-semi': e(),                       // http://eslint.org/docs/rules/no-extra-semi
        'no-func-assign': e(),                      // http://eslint.org/docs/rules/no-func-assign
        'no-inner-declarations': e(['functions']),  // http://eslint.org/docs/rules/no-inner-declarations
        'no-invalid-regexp': e(),                   // http://eslint.org/docs/rules/no-invalid-regexp
        'no-irregular-whitespace': e(),             // http://eslint.org/docs/rules/no-irregular-whitespace
        'no-negated-in-lhs': e(),                   // http://eslint.org/docs/rules/no-negated-in-lhs
        'no-obj-calls': e(),                        // http://eslint.org/docs/rules/no-obj-calls
        'no-regex-spaces': e(),                     // http://eslint.org/docs/rules/no-regex-spaces
        'no-sparse-arrays': e(),                    // http://eslint.org/docs/rules/no-sparse-arrays
        'no-unexpected-multiline': e(),             // http://eslint.org/docs/rules/no-unexpected-multiline
        'no-unreachable': e(),                      // http://eslint.org/docs/rules/no-unreachable
        'use-isnan': e(),                           // http://eslint.org/docs/rules/use-isnan
        'valid-jsdoc': w([{                         // http://eslint.org/docs/rules/valid-jsdoc
            requireReturn: false
        }]),
        'valid-typeof': e(),                        // http://eslint.org/docs/rules/valid-typeof

        //  http://eslint.org/docs/rules/#best-practices
        'accessor-pairs': e(),                      // http://eslint.org/docs/rules/accessor-pairs
        'array-callback-return': e(),               // http://eslint.org/docs/rules/array-callback-return
        'block-scoped-var': e(),                    // http://eslint.org/docs/rules/block-scoped-var
        'complexity': e([5]),                       // http://eslint.org/docs/rules/complexity
        'consistent-return': e(),                   // http://eslint.org/docs/rules/consistent-return
        'curly': e(['all']),                        // http://eslint.org/docs/rules/curly
        'default-case': e(),                        // http://eslint.org/docs/rules/default-case
        'dot-location': e(['property']),            // http://eslint.org/docs/rules/dot-location
        'dot-notation': e(),                        // http://eslint.org/docs/rules/dot-notation
        'eqeqeq': e(),                              // http://eslint.org/docs/rules/eqeqeq
        'guard-for-in': e(),                        // http://eslint.org/docs/rules/guard-for-in
        'no-alert': e(),                            // http://eslint.org/docs/rules/no-alert
        'no-caller': e(),                           // http://eslint.org/docs/rules/no-caller
        'no-case-declarations': e(),                // http://eslint.org/docs/rules/no-case-declarations
        'no-div-regex': off(),                      // http://eslint.org/docs/rules/no-div-regex
        'no-else-return': e(),                      // http://eslint.org/docs/rules/no-else-return
        'no-empty-function': e(),                   // http://eslint.org/docs/rules/no-empty-function
        'no-empty-pattern': e(),                    // http://eslint.org/docs/rules/no-empty-pattern
        'no-eq-null': e(),                          // http://eslint.org/docs/rules/no-eq-null
        'no-eval': e(),                             // http://eslint.org/docs/rules/no-eval
        'no-extend-native': e(),                    // http://eslint.org/docs/rules/no-extend-native
        'no-extra-bind': e(),                       // http://eslint.org/docs/rules/no-extra-bind
        'no-extra-label': e(),                      // http://eslint.org/docs/rules/no-extra-label
        'no-fallthrough': e(),                      // http://eslint.org/docs/rules/no-fallthrough
        'no-floating-decimal': e(),                 // http://eslint.org/docs/rules/no-floating-decimal
        'no-implicit-coercion': e(),                // http://eslint.org/docs/rules/no-implicit-coercion
        'no-implicit-globals': e(),                 // http://eslint.org/docs/rules/no-implicit-globals
        'no-implied-eval': e(),                     // http://eslint.org/docs/rules/no-implied-eval
        'no-invalid-this': off(),                   // http://eslint.org/docs/rules/no-invalid-this
        'no-iterator': e(),                         // http://eslint.org/docs/rules/no-iterator
        'no-labels': e([{                           // http://eslint.org/docs/rules/no-labels
            allowLoop: true
        }]),
        'no-lone-blocks': e(),                      // http://eslint.org/docs/rules/no-lone-blocks
        'no-loop-func': e(),                        // http://eslint.org/docs/rules/no-loop-func
        'no-magic-numbers': off(),                  // Bullshit, http://eslint.org/docs/rules/no-magic-numbers
        'no-multi-spaces': e(),                     // http://eslint.org/docs/rules/no-multi-spaces
        'no-multi-str': e(),                        // http://eslint.org/docs/rules/no-multi-str
        'no-native-reassign': e(),                  // http://eslint.org/docs/rules/no-native-reassign
        'no-new': e(),                              // http://eslint.org/docs/rules/no-new
        'no-new-func': e(),                         // http://eslint.org/docs/rules/no-new-func
        'no-new-wrappers': e(),                     // http://eslint.org/docs/rules/no-new-wrappers
        'no-octal': e(),                            // http://eslint.org/docs/rules/no-octal
        'no-octal-escape': e(),                     // http://eslint.org/docs/rules/no-octal-escape
        'no-param-reassign': off(),                 // http://eslint.org/docs/rules/no-param-reassign
        'no-proto': e(),                            // http://eslint.org/docs/rules/no-proto
        'no-redeclare': e(),                        // http://eslint.org/docs/rules/no-redeclare
        'no-return-assign': e(),                    // http://eslint.org/docs/rules/no-return-assign
        'no-script-url': e(),                       // http://eslint.org/docs/rules/no-script-url
        'no-self-assign': e(),                      // http://eslint.org/docs/rules/no-self-assign
        'no-self-compare': e(),                     // http://eslint.org/docs/rules/no-self-compare
        'no-sequences': e(),                        // http://eslint.org/docs/rules/no-sequences
        'no-throw-literal': e(),                    // http://eslint.org/docs/rules/no-throw-literal:
        'no-unmodified-loop-condition': e(),        // http://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unused-expressions': e(),               // http://eslint.org/docs/rules/no-unused-expressions
        'no-unused-labels': e(),                    // http://eslint.org/docs/rules/no-unused-labels
        'no-useless-call': e(),                     // http://eslint.org/docs/rules/no-useless-call
        'no-useless-concat': e(),                   // http://eslint.org/docs/rules/no-useless-concat
        'no-useless-escape': e(),                   // http://eslint.org/docs/rules/no-useless-escape
        'no-void': e(),                             // http://eslint.org/docs/rules/no-void
        'no-warning-comments': w([{                 // http://eslint.org/docs/rules/no-warning-comments
            location: 'anywhere',
            terms: [
                'todo',
                'fix',
                'fixme',
                'xxx',
                'eslint'
            ]
        }]),
        'no-with': e(),                             // http://eslint.org/docs/rules/no-with
        'radix': e(),                               // http://eslint.org/docs/rules/radix
        'vars-on-top': off(),                       // http://eslint.org/docs/rules/vars-on-top
        'wrap-iife': e(['inside']),                 // http://eslint.org/docs/rules/wrap-iife
        'yoda': e(['never']),                       // http://eslint.org/docs/rules/yoda

        //  http://eslint.org/docs/rules/#strict-mode
        'strict': e(['safe']),                      // http://eslint.org/docs/rules/strict

        //  http://eslint.org/docs/rules/#variables
        'init-declarations': off(),                 // http://eslint.org/docs/rules/init-declarations
        'no-catch-shadow': e(),                     // http://eslint.org/docs/rules/no-catch-shadow
        'no-delete-var': e(),                       // http://eslint.org/docs/rules/no-delete-var
        'no-label-var': e(),                        // http://eslint.org/docs/rules/no-label-var
        'no-restricted-globals': e([]),             // http://eslint.org/docs/rules/no-restricted-globals
        'no-shadow': e([{                           // http://eslint.org/docs/rules/no-shadow
            builtinGlobals: false,
            hoist: 'all'
        }]),
        'no-shadow-restricted-names': e(),          // http://eslint.org/docs/rules/no-shadow-restricted-names
        'no-undef': e(),                            // http://eslint.org/docs/rules/no-undef
        'no-undef-init': off(),                     // http://eslint.org/docs/rules/no-undef-init
        'no-undefined': e(),                        // http://eslint.org/docs/rules/no-undefined
        'no-unused-vars': e(),                      // http://eslint.org/docs/rules/no-unused-vars
        'no-use-before-define': e([{                // http://eslint.org/docs/rules/no-use-before-define
            functions: true,
            classes: false
        }]),

        //  http://eslint.org/docs/rules/#nodejs-and-commonjs
        'callback-return': e(),                     // http://eslint.org/docs/rules/callback-return
        'global-require': e(),                      // http://eslint.org/docs/rules/global-require
        'handle-callback-err': e(),                 // http://eslint.org/docs/rules/handle-callback-err
        'no-mixed-requires': e(),                   // http://eslint.org/docs/rules/no-mixed-requires
        'no-new-require': e(),                      // http://eslint.org/docs/rules/no-new-require
        'no-path-concat': e(),                      // http://eslint.org/docs/rules/no-path-concat
        'no-process-env': off(),                    // http://eslint.org/docs/rules/no-process-env
        'no-process-exit': e(),                     // http://eslint.org/docs/rules/no-process-exit
        'no-restricted-modules': e([]),             // http://eslint.org/docs/rules/no-restricted-modules
        'no-sync': off([]),                         // http://eslint.org/docs/rules/no-sync

        //  http://eslint.org/docs/rules/#stylistic-issues
        'array-bracket-spacing': e(['never']),      // http://eslint.org/docs/rules/array-bracket-spacing
        'block-spacing': e(['never']),              // http://eslint.org/docs/rules/block-spacing
        'brace-style': e(['1tbs']),                 // http://eslint.org/docs/rules/brace-style
        'camelcase': off(),                         // http://eslint.org/docs/rules/camelcase
        'comma-spacing': e([{                       // http://eslint.org/docs/rules/comma-spacing
            before: false,
            after: true
        }]),
        'comma-style': e(['last']),                 // http://eslint.org/docs/rules/comma-style
        'computed-property-spacing': e(['never']),  // http://eslint.org/docs/rules/computed-property-spacing
        'consistent-this': e(['that']),             // http://eslint.org/docs/rules/consistent-this
        'eol-last': e(['unix']),                    // http://eslint.org/docs/rules/eol-last
        'func-names': off(),                        // http://eslint.org/docs/rules/func-names
        'func-style': off(),                        // http://eslint.org/docs/rules/func-style
        'id-blacklist': e([]),                      // http://eslint.org/docs/rules/id-blacklist
        'id-length': off(),                         // Bullshit, http://eslint.org/docs/rules/id-length
        'id-match': off(),                          // http://eslint.org/docs/rules/id-match
        'indent': e([4, {SwitchCase: 1}]),          // http://eslint.org/docs/rules/indent
        'jsx-quotes': e(['prefer-double']),         // http://eslint.org/docs/rules/jsx-quotes
        'key-spacing': e([{                         // http://eslint.org/docs/rules/key-spacing
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }]),
        'keyword-spacing': e([{                     // http://eslint.org/docs/rules/keyword-spacing
            before: true,
            after: true,
            overrides: {}
        }]),
        'linebreak-style': e(['unix']),             // http://eslint.org/docs/rules/linebreak-style
        'lines-around-comment': e([{                // http://eslint.org/docs/rules/lines-around-comment
            beforeBlockComment: true,
            afterBlockComment: false,
            beforeLineComment: false,
            afterLineComment: false,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true
        }]),
        'max-depth': e([{max: 4}]),                 // http://eslint.org/docs/rules/max-depth
        'max-len': e([{                             // http://eslint.org/docs/rules/max-len
            code: 120,
            tabWidth: 4,
            comments: 120,
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: false
        }]),
        'max-nested-callbacks': e([{max: 3}]),      // http://eslint.org/docs/rules/max-nested-callbacks
        'max-params': e([{max: 4}]),                // http://eslint.org/docs/rules/max-params
        'max-statements': off(),                    // http://eslint.org/docs/rules/max-statements
        'max-statements-per-line': e([{max: 1}]),   // http://eslint.org/docs/rules/max-statements-per-line
        'new-cap': e([{                             // http://eslint.org/docs/rules/new-cap
            newIsCap: true,
            capIsNew: true,
            newIsCapExceptions: [],
            capIsNewExceptions: [
                'Boolean',
                'Number',
                'Object',
                'String',
                'Symbol',
                'I18N',
                'Event'
            ],
            properties: true
        }]),
        'new-parens': e(),                          // http://eslint.org/docs/rules/new-cap
        'newline-after-var': e(['always']),         // http://eslint.org/docs/rules/newline-after-var
        'newline-before-return': off(),             // http://eslint.org/docs/rules/newline-before-return
        'newline-per-chained-call': e([{            // http://eslint.org/docs/rules/newline-per-chained-call
            ignoreChainWithDepth: 3
        }]),
        'no-array-constructor': off(),              // http://eslint.org/docs/rules/no-array-constructor
        'no-bitwise': e([{                          // http://eslint.org/docs/rules/no-bitwise
            allow: ['|', '|='],
            int32Hint: false
        }]),
        'no-continue': off(),                       // http://eslint.org/docs/rules/no-continue
        'no-inline-comments': off(),                // http://eslint.org/docs/rules/no-inline-comments
        'no-lonely-if': e(),                        // http://eslint.org/docs/rules/no-lonely-if
        'no-mixed-spaces-and-tabs': e(),            // http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
        'no-multiple-empty-lines': e([{max: 1}]),   // http://eslint.org/docs/rules/no-multiple-empty-lines
        'no-negated-condition': e(),                // http://eslint.org/docs/rules/no-negated-condition
        'no-nested-ternary': e(),                   // http://eslint.org/docs/rules/no-nested-ternary
        'no-new-object': e(),                       // http://eslint.org/docs/rules/no-new-object
        'no-plusplus': e(),                         // http://eslint.org/docs/rules/no-plusplus
        'no-restricted-syntax': e([                 // http://eslint.org/docs/rules/no-restricted-syntax
            'WithStatement'
        ]),
        'no-spaced-func': e(),                      // http://eslint.org/docs/rules/no-spaced-func
        'no-ternary': off(),                        // http://eslint.org/docs/rules/no-ternary
        'no-trailing-spaces': e([{                  // http://eslint.org/docs/rules/no-trailing-spaces
            skipBlankLines: false
        }]),
        'no-underscore-dangle': off(),              // http://eslint.org/docs/rules/no-underscore-dangle
        'no-unneeded-ternary': e([{                 // http://eslint.org/docs/rules/no-unneeded-ternary
            defaultAssignment: false
        }]),
        'no-whitespace-before-property': e(),       // http://eslint.org/docs/rules/no-whitespace-before-property
        'object-curly-spacing': e(['never']),       // http://eslint.org/docs/rules/object-curly-spacing
        'one-var': e(['never']),                    // http://eslint.org/docs/rules/one-var
        'one-var-declaration-per-line': e([         // http://eslint.org/docs/rules/one-var-declaration-per-line
            'always'
        ]),
        'operator-assignment': e(['always']),       // http://eslint.org/docs/rules/operator-assignment
        'operator-linebreak': e(['after', {         // http://eslint.org/docs/rules/operator-linebreak
            overrides: {}
        }]),
        'quote-props': e(['as-needed']),            // http://eslint.org/docs/rules/quote-props
        'quotes': e(['single', {                    // http://eslint.org/docs/rules/quotes
            avoidEscape: false,
            allowTemplateLiterals: false
        }]),
        'require-jsdoc': e([{                       // http://eslint.org/docs/rules/require-jsdoc
            require: {
                FunctionDeclaration: false,
                MethodDefinition: false,
                ClassDeclaration: true
            }
        }]),
        'semi': e(['always']),                      // http://eslint.org/docs/rules/semi
        'semi-spacing': e([{                        // http://eslint.org/docs/rules/semi-spacing
            before: false,
            after: true
        }]),
        'sort-vars': off(),                         // http://eslint.org/docs/rules/sort-vars
        'space-before-blocks': e([{                 // http://eslint.org/docs/rules/space-before-blocks
            functions: 'always',
            keywords: 'always',
            classes: 'always'
        }]),
        'space-before-function-paren': e([{         // http://eslint.org/docs/rules/space-before-function-paren
            anonymous: 'always',
            named: 'never'
        }]),
        'space-in-parens': e(['never']),            // http://eslint.org/docs/rules/space-in-parens
        'space-infix-ops': e([{                     // http://eslint.org/docs/rules/space-infix-ops
            int32Hint: false
        }]),
        'space-unary-ops': e([{                     // http://eslint.org/docs/rules/space-unary-ops
            words: true,
            nonwords: false,
            overrides: {}
        }]),
        'spaced-comment': e(['always', {            // http://eslint.org/docs/rules/spaced-comment
            markers: [],
            exceptions: [],
            block: {
                markers: [],
                exceptions: []
            },
            line: {
                markers: [],
                exceptions: []
            }
        }]),
        'wrap-regex': off(),                        // http://eslint.org/docs/rules/wrap-regex

        // http://eslint.org/docs/rules/#ecmascript-6
        'arrow-body-style': e(['as-needed']),       // http://eslint.org/docs/rules/arrow-body-style
        'arrow-parens': e(['always']),              // http://eslint.org/docs/rules/arrow-parens
        'arrow-spacing': e([{                       // http://eslint.org/docs/rules/arrow-spacing
            before: true,
            after: true
        }]),
        'constructor-super': e(),                   // http://eslint.org/docs/rules/constructor-super
        'generator-star-spacing': e([{              // http://eslint.org/docs/rules/generator-star
            before: true,
            after: false
        }]),
        'no-class-assign': e(),                     // http://eslint.org/docs/rules/no-class-assign
        'no-confusing-arrow': e([{                  // http://eslint.org/docs/rules/no-confusing-arrow
            allowParens: true
        }]),
        'no-const-assign': e(),                     // http://eslint.org/docs/rules/no-confusing-arrow
        'no-dupe-class-members': e(),               // http://eslint.org/docs/rules/no-dupe-class-members
        'no-duplicate-imports': e(),                // http://eslint.org/docs/rules/no-duplicate-imports
        'no-new-symbol': e(),                       // http://eslint.org/docs/rules/no-new-symbol
        'no-restricted-imports': e([]),             // http://eslint.org/docs/rules/no-restricted-imports
        'no-this-before-super': e(),                // http://eslint.org/docs/rules/no-this-before-super
        'no-useless-computed-key': e(),             // http://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-constructor': e(),              // http://eslint.org/docs/rules/no-useless-constructor
        'no-var': off(),                            // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/no-var
        'object-shorthand': off(),                  // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/object-shorthand
        'prefer-arrow-callback': off(),             // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-const': off(),                      // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/no-useless-constructor
        'prefer-reflect': off(),                    // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/prefer-reflect
        'prefer-rest-params': off(),                // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-spread': off(),                     // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/prefer-spread
        'prefer-template': off(),                   // ES5 incompatible,
                                                    // http://eslint.org/docs/rules/prefer-template
        'require-yield': e(),                       // http://eslint.org/docs/rules/require-yield
        'sort-imports': off(),                      // http://eslint.org/docs/rules/sort-imports
        'template-curly-spacing': e(['never']),     // http://eslint.org/docs/rules/template-curly-spacing
        'yield-star-spacing': e([{                  // http://eslint.org/docs/rules/yield-star-spacing
            before: true,
            after: false
        }])
    }
};
