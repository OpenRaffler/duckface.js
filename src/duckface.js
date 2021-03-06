/*
 * Code taken from http://jscriptpatterns.blogspot.be/2013/01/javascript-interfaces.html
 * and modified for stricter method checking via
 * arguments inspection (http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript)
 */


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Duckface = root.Duckface || factory();
  }
})(this, function () {
    'use strict';

    function getParamNames(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null) {
            result = [];
        }
        return result;
    }
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array) {
            return false;
        }

        // compare lengths - can save a lot of time 
        if (this.length != array.length) {
            return false;
        }

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i])) {
                    return false;       
                }
            } else if (this[i] != array[i]) { 
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;   
            }           
        }       
        return true;
    }   

    function Duckface(objectName, methods) {
        if (arguments.length != Duckface.length) {
            throw new Error ("Duckface constructor called with " + arguments.length + "arguments, but expected exactly " + Duckface.length);
        }

        if (typeof this === "undefined") {
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
                if (method.args !== null && !method.args.equals(getParamNames(object[method.name]))) {
                    throw new Error("Method " + method.name + " does not adhere to the Duckface definition. Requires arguments '" + method.args.join("','") + "' in the method definition.");
                }
            }
        }
    };

    return Duckface;
});
