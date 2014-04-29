var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname + "/../src",
    packages: [
        {
            name: "squirejs",
            location: "../node_modules/squirejs",
            main: "src/Squire"
        }
    ]
});

var chai = requirejs("chai");
var should = chai.should();
var Squire = requirejs("squirejs");

describe('when calling foo.foo()', function () {
   it('should return "foo"', function() {
        var foo = requirejs(__dirname + "/../src/foo.js");
        foo.foo().should.equal("foo");
    });
});

describe('when calling bar.bar()', function () {
    var bar = requirejs("bar");
    it('should return "bar"', function() {
        bar.bar().should.equal("bar");
    });
});

describe('when calling bar.bar() with async requirejs', function () {
    it('should return "bar"', function(done) {
        requirejs(["bar"], function(bar) {
            bar.bar().should.equal("bar");
            done();
        })
    });
});

describe('when mocking foo.foo() and calling bar.bar()', function () {
    it('should return "barbar"', function(done) {
        var injector = new Squire();
        var fooMock = {
            foo : function() {
                return "foofoo"; /* instead of just foo */
            }
        };
        injector
          .mock('foo', fooMock)
          .require(["bar"], function(bar) {
              bar.bar().should.equal("barfoo");
              done();
          });
    });
});


