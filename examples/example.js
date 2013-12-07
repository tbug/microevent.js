// import microevent.js 
var MicroEvent = require('../microevent.js')

/**
 * Ticker is a class periodically sending out dummy tick events
 */
var Ticker = function(interval) {
    var self = this;
    setInterval(function() {
        self.trigger('tick', new Date());
    }, interval);
};
/**
 * make Ticker support MicroEventjs
 */
MicroEvent.mixin(Ticker);

// create a ticker
var ticker = new Ticker(1000);
// bind the 'tick' event
ticker.bind('tick', function(date) {
    // display to check
    console.log('notified date', date);
});