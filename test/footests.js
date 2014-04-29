var requirejs = require('requirejs');
var chai = requirejs("chai");
var should = chai.should();
var Squire = requirejs(__dirname + "/../node_modules/squirejs/src/Squire.js");

describe('when calling foo.foo()', function () {
   it('should return "foo"', function() {
        var foo = requirejs(__dirname + "/../src/foo.js");
        foo.foo().should.equal("foo");
    });
});

describe('when calling bar.bar()', function () {
    var bar = requirejs(__dirname + "/../src/bar.js");
    it('should return "bar"', function() {
        bar.bar().should.equal("bar");
    });
});

describe('when calling bar.bar() with async requirejs', function () {
    it('should return "bar"', function(done) {
        requirejs(__dirname + "/../src/bar.js", function(bar) {
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
          .mock('./foo.js', fooMock)
          .require(__dirname + "/../src/bar.js", function(bar) {
              bar.bar().should.equal("barbar");
              done();
          });
    });
});


