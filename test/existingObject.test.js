var MicroEvent = require('../cov-microevent.js');
var assert = require('assert');

var MyFn = function() {
};

describe('existing object', function() {
    var obj = new MyFn();

    it('mixin', function () {
        MicroEvent.mixin(obj);
        assert(obj.bind instanceof Function, "bind is not a function");
        assert(obj.unbind instanceof Function, "unbind is not a function");
        assert(obj.trigger instanceof Function, "trigger is not a function");
        assert(obj.once instanceof Function, "once is not a function");
    });

});
