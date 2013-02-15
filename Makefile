test:
	@./node_modules/.bin/mocha \
		--reporter dot \
		--require should

docs:
	@dox --api < index.js | sed s/proto/Enumerable/

.PHONY: clean test docs
