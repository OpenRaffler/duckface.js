REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \

test-coverage:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \

test-coveralls: test-coverage
	@cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true

.PHONY: test
