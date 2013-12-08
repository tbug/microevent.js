var MicroEvent = require('../cov-microevent.js');
var assert = require('assert');

var Ticker = function(interval) {
    var self = this;
    var id = setInterval(function() {
        self.trigger('tick');
    }, interval);
};

describe('ticker', function() {
    var ticker;
    //first check that mixin adds all the expected functions to the prototype
    //this should obviously not fail
    it('mixin', function () {
        MicroEvent.mixin(Ticker);
        assert(Ticker.prototype.bind instanceof Function, "bind is not a function");
        assert(Ticker.prototype.unbind instanceof Function, "unbind is not a function");
        assert(Ticker.prototype.trigger instanceof Function, "trigger is not a function");
        assert(Ticker.prototype.once instanceof Function, "once is not a function");
    });

    //we create our test object
    it('create object', function () {
        ticker = new Ticker(4);
    })
    //bind a handler that unbinds itself again
    it('bind handler', function (done) {
        var handler = function () {
            ticker.unbind('tick', handler);
            done();
        };
        //bind handler to ticker
        ticker.bind('tick', handler);
    });
    //now check that we have no handlers assigned to anything
    it('unbinds correctly', function () {
        for (event in ticker._events) {
            assert.equal(ticker._events[event].length, 0, 'handlers not being unbound correctly');
        }
    });

    it('checking once method', function (done) {
        var counter = 0;
        ticker.once('tick', function () {
            counter += 1;
        });
        //wait 30 seconds before checking once not being called multiple times
        setTimeout(function () {
            assert.equal(counter, 1, '"once" called more than once');
            done();
        }, 30);
    });

});
