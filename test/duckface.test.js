var assert = require("chai").assert;
var Duckface = require("../src/duckface.js");

// TODO write the tests...

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
    });
});
