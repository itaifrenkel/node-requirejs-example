define(['./foo.js'], function(foo) {

    var bar = function() {
        return foo.foo().replace("foo","bar");
    };

    return { bar : bar };
});