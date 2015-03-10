REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \

test-coverage:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \

.PHONY: test
