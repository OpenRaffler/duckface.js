if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

/*
 * Code taken from http://jscriptpatterns.blogspot.be/2013/01/javascript-interfaces.html
 * and minimally modified for stricter method checking via
 * arguments inspection (http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript)
 */
define(function (require) {
    'use strict';

    function Duckface(objectName, methods) {
        if (arguments.length != Duckface.length) {
            throw new Error ("Duckface constructor called with " + arguments.length + "arguments, but expected exactly " + Duckface.length);
        }

        if (this.constructor != Duckface) {
            throw new Error ("Duckface should be called as a constructor");
        }

        if (typeof objectName !== "string") {
            throw new Error ("First argument should be a string");
        }

        if (!(methods instanceof Array || methods instanceof Object)) {
            throw new Error ("Second argument should be an Array or Object");
        }

        this.name = objectName;
        this.methods = [];

        if (methods instanceof Array) {
            for (var i = 0, len = methods.length; i < len; i++) {
                if (typeof methods[i] !== "string") {
                    throw new Error ("Method names should be specified as strings");
                }

                this.methods.push({
                    name: methods[i],
                    args: null
                });
            }
        } else if (methods instanceof Object) {
            var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            var ARGUMENT_NAMES = /([^\s,]+)/g;
            var getParamNames = function getParamNames(func) {
                var fnStr = func.toString().replace(STRIP_COMMENTS, '');
                var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
                if(result === null) {
                    result = [];
                }
                return result;
            }


            var keys = Object.keys(methods);

            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                var dummyMethod = methods[key];
                var args = getParamNames(dummyMethod);

                this.methods.push({
                    name: key,
                    args: args
                });
            }
        }
    }

    Duckface.ensureImplements = function(object) {
        if (arguments.length < 2) {
            throw new Error("Function Duckface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
        }

        for (var i = 1, len = arguments.length; i < len; i++) {
            var duckface = arguments[i];
            if (duckface.constructor !== Duckface) {
                throw new Error("Function Duckface.ensureImplements expects arguments two and above to be instances of Duckface.");
            }

            for (var j = 0, methodsLen = duckface.methods.length; j < methodsLen; j++) {
                var method = duckface.methods[j];
                if (!object[method.name] || typeof object[method.name] !== 'function') {
                    throw new Error("Function Duckface.ensureImplements: object does not implement the " + duckface.name + " duckface. Method " + method.name + " was not found.");
                }

                // stricter checking
                if (method.args !== null && method.args != getParamNames(object[method.name])) {
                    throw new Error("Method " + method.name + " does not adhere to the Duckface definition. Requires arguments '" + method.args.join("','") + "' in the method definition.");
                }
            }
        }
    };

    return Duckface;
});
