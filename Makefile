#!/usr/bin/env make
.DEFAULT_GOAL = all

.PHONY: all
all:: test

.PHONY: test
test:: lint
test:: cover

.PHONY: lint
lint:: jscs
lint:: eslint

.PHONY: jscs
jscs:
	@jscs test *.js

.PHONY: eslint
eslint:
	@eslint test *.js

.PHONY: cover
cover:
	@rm -rf coverage
	@mkdir -p coverage
	@istanbul cover node_modules/.bin/_mocha

.PHONY: benchmark
benchmark:
	@./tools/benchmark
