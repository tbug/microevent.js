var MicroEvent = require('../');
var assert = require('assert');

var Ticker = function(interval) {
    var self = this;
    setInterval(function() {
        self.trigger('tick', new Date());
    }, interval);
};

describe('ticker', function() {
    it('mixin', function() {
        MicroEvent.mixin(Ticker);
        assert(Ticker.prototype.bind instanceof Function, "bind is not a function");
        assert(Ticker.prototype.unbind instanceof Function, "unbind is not a function");
        assert(Ticker.prototype.trigger instanceof Function, "trigger is not a function");
    });
});
