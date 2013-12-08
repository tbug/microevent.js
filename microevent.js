"use strict";
(function () {
    /**
     * MicroEvent - to make any js object an event emitter (server or browser)
     */

    var MicroEvent = function() {};
    MicroEvent.prototype = {
        bind: function(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event] || [];
            this._events[event].push(fct);
        },
        unbind: function(event, fct) {
            this._events = this._events || {};
            if (event in this._events === false) return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        },
        trigger: function(event /* , args... */ ) {
            var events = this._events || {};
            if (!(event in events)) return;
            for (var i = 0; i < events[event].length; i++) {
                events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        },
        once: function (event, fct) {
            var wrapper = function () {
                this.unbind(event, wrapper);
                fct.apply(this, Array.prototype.slice.call(arguments, 0));
            };
            this.bind(event, wrapper);
        }
    };

    MicroEvent.prototype.on = MicroEvent.prototype.bind;
    MicroEvent.prototype.off = MicroEvent.prototype.unbind;

    /**
     * mixin will delegate all MicroEvent.js function in the destination object
     * @param {Object} the object which will support MicroEvent
     */
    MicroEvent.mixin = function(destObject) {
        var props = ['bind', 'unbind', 'once', 'trigger'];
        for (var i = 0; i < props.length; i++) {
            if (typeof destObject === 'function') {
                destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
            } else {
                destObject[props[i]] = MicroEvent.prototype[props[i]];
            }
        }
    }

    // export in common js
    if (typeof module !== "undefined" && ('exports' in module)) {
        module.exports = MicroEvent;
    }
    else if (typeof define === "function") {
        define([], MicroEvent);
    }
    else {
        window.MicroEvent = MicroEvent;
    }
})();