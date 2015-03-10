var assert = require("chai").assert;
var Duckface = require("../src/duckface.js");

describe('Duckface', function(){
    describe('#constructor', function(){
        it('should throw error when no arguments are provided', function(){
            assert.throws(
                function(){
                    var d = new Duckface();
                },
                Error
            );
        });

        it('should throw error when more than 2 arguments are provided', function(){
            assert.throws(
                function(){
                    var d = new Duckface('foo', 'bar', 'baz');
                },
                Error
            );
        });

        it('should throw error when not called as a constructor', function(){
            assert.throws(
                function(){
                    Duckface('foo', 'bar');
                },
                Error
            );
        });

        it('should throw error when first argument is not a string', function(){
            assert.throws(
                function(){
                    var d = new Duckface(123, 'bar');
                },
                Error
            );
        });

        it('should throw error when second argument is not an object or array', function(){
            assert.throws(
                function(){
                    var d = new Duckface('Foo', 'bar');
                },
                Error
            );

            assert.throws(
                function(){
                    var d = new Duckface('Foo', 123);
                },
                Error
            );

            assert.doesNotThrow(
                function(){
                    var d = new Duckface('Foo', []);
                },
                Error
            );

            assert.doesNotThrow(
                function(){
                    var d = new Duckface('Foo', {});
                },
                Error
            );
        });

        it('should throw error when second argument contains a non-string', function(){
            assert.throws(
                function(){
                    var d = new Duckface('Foo', ['bar', 'baz', 123]);
                },
                Error
            );

            assert.doesNotThrow(
                function(){
                    var d = new Duckface('Foo', ['bar', 'baz']);
                },
                Error
            );
        });

        it('should add an object to internal property when a valid method-name is provided', function(){
            var methods = ['bar', 'baz'];
            var d = new Duckface('Foo', methods);
            assert.lengthOf(d.methods, methods.length);
            for (var i =0; i < d.methods.length; i++) {
                assert.isObject(d.methods[i]);
                assert.lengthOf(Object.keys(d.methods[i]), 2);
                assert.property(d.methods[i], 'name');
                assert.property(d.methods[i], 'args');
                assert.equal(d.methods[i].name, methods[i]);
                assert.isNull(d.methods[i].args);
            }
        });

        it('should be an instance of Duckface', function(){
            var d = new Duckface('Foo', []);
            assert.instanceOf(d, Duckface);
        });

        it('should add an object to internal property when a valid method-name and function signature are provided', function() {
            var signatures = {
                'foo':function(bar, baz) {},
                'test':function() {}
            };
            var d = new Duckface('Dummy', signatures);
            var keys = Object.keys(signatures);
            assert.lengthOf(d.methods, keys.length);
            for (var i =0; i < d.methods.length; i++) {
                assert.isObject(d.methods[i]);
                assert.lengthOf(Object.keys(d.methods[i]), 2);
                assert.property(d.methods[i], 'name');
                assert.property(d.methods[i], 'args');
                var key = keys[i];
                assert.equal(d.methods[i].name, key);
                assert.isArray(d.methods[i].args);
                if (i === 0) {
                    assert.sameMembers(
                        d.methods[i].args,
                        ['bar', 'baz']
                    );
                }
                if (i === 1) {
                    assert.lengthOf(d.methods[i].args, 0);
                }
            }
        });
    });


    describe('#ensureImplements', function() {
        it('should throw error when no arguments are provided', function(){
            assert.throws(
                function(){
                    Duckface.ensureImplements();
                },
                Error
            );
        });
    });
});
