REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \

test-coverage:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \

test-coveralls:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha --report lcovonly -- -R spec && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls

.PHONY: test
