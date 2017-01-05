#!/usr/bin/env make
.DEFAULT_GOAL = all

.PHONY: all
all:: test

.PHONY: test
test:: lint
test:: cover

.PHONY: lint
lint:: eslint

.PHONY: eslint
eslint: node_modules
	@eslint *.js

.PHONY: cover
cover: node_modules
	@rm -rf coverage
	@mkdir -p coverage
	@istanbul cover node_modules/.bin/_mocha

.PHONY: benchmark
benchmark: node_modules
	@./tools/benchmark

node_modules: package.json .npmrc
	@rm -rf node_modules
	@npm install
