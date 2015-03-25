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
                    Duckface('foo', ['bar']);
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
        it('should throw error when only 1 argument is provided', function(){
            assert.throws(
                function(){
                    Duckface.ensureImplements({});
                },
                Error
            );
        });
        it('should throw error when argument 2 is not a duckface', function(){
            assert.throws(
                function(){
                    Duckface.ensureImplements({}, {});
                },
                Error
            );
        });
        it('should throw error when argument bigger than 2 is not a duckface', function(){
            assert.throws(
                function(){
                    var a = new Duckface('A', ['a']);
                    var b = new Duckface('B', ['B']);
                    Duckface.ensureImplements({}, a, b, {});
                },
                Error
            );
        });
        it('should throw error when object does not implement all methods of a duckface', function(){
            assert.throws(
                function(){
                    var a = new Duckface('A', ['a', 'b', 'c']);
                    Duckface.ensureImplements({}, a);
                },
                Error
            );
        });
        it('should not throw an error when object implements all methods of a duckface', function(){
            assert.doesNotThrow(
                function(){
                    var a = new Duckface('A', ['a', 'b', 'c']);
                    var obj = {
                        a: function(){},
                        b: function(){},
                        c: function(){},
                    };
                    Duckface.ensureImplements(obj, a);
                },
                Error
            );
        });
        it('should throw error when object does not implement all methods correctly of a duckface with function signatures', function(){
            assert.throws(
                function(){
                    var methods = {
                        a: function(foo, bar) {},
                        b: function() {}
                    };
                    var a = new Duckface('A', methods);
                    Duckface.ensureImplements({}, a);
                },
                Error
            );
            assert.throws(
                function(){
                    var methods = {
                        a: function(foo, bar) {},
                        b: function() {}
                    };
                    var a = new Duckface('A', methods);
                    Duckface.ensureImplements({b:function(){}}, a);
                },
                Error
            );
        });
        it('should throw error when object does not correctly implement all method signatures of a duckface', function(){
            assert.throws(
                function(){
                    var methods = {
                        a: function(foo, bar) {},
                        b: function() {}
                    };
                    var a = new Duckface('A', methods);

                    var impl = {
                        a: function(foo) {},
                        b: function(){}
                    };
                    Duckface.ensureImplements(impl, a);
                },
                Error
            );
            assert.doesNotThrow(
                function(){
                    var methods = {
                        a: function(foo, bar) {},
                        b: function() {}
                    };
                    var a = new Duckface('A', methods);

                    var impl = {
                        a: function(foo, bar) {},
                        b: function(){}
                    };
                    Duckface.ensureImplements(impl, a);
                },
                Error
            );
        });
    });
});


describe('Array.prototype.equals', function() {
    it('should return false when compared with a non-array', function(){
        assert.isFalse([].equals('foo'));
        assert.isFalse([].equals(true));
        assert.isFalse([].equals(false));
        assert.isFalse([].equals({}));
        assert.isFalse([].equals(123));
        assert.isFalse([].equals(123.45));
    });

    it('should return false when lengths are not the same', function() {
        assert.isFalse(['foo'].equals([]));
        assert.isFalse(['foo'].equals(['bar','baz']));
    });

    it('should return true when both arrays are empty', function() {
        assert.isTrue([].equals([]));
    });

    it('should return false when sub-arrays are not equal', function() {
        assert.isFalse([[]].equals([['foo']]));
    });

    it('should return false if at least one of the elements is different', function() {
        assert.isFalse(['foo','bar','baz'].equals(['foo','bar','faz']));
    });
});
