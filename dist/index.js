"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function minitter() {
    const listeners = {};
    return {
        on,
        once,
        off,
        emit,
        listenerCount,
    };
    function listenerCount(event) {
        return listeners[event] ? listeners[event].length : 0;
    }
    function on(event, listener) {
        if (_.has(listeners, event) && !_.includes(listeners[event], listener)) {
            listeners[event].push(listener);
        }
        else {
            listeners[event] = [listener];
        }
    }
    function once(event, listener) {
        on(event, wrapped);
        function wrapped() {
            listener.apply(null, arguments);
            off(event, wrapped);
        }
    }
    function off(event, listener) {
        listeners[event] = listeners[event].filter(l => l !== listener);
    }
    function emit(event, arg) {
        if (listeners[event]) {
            listeners[event].forEach(f => f.call(null, arg));
        }
    }
}
exports.default = minitter;
var _;
(function (_) {
    function includes(arr, target) {
        return arr.indexOf(target) >= 0;
    }
    _.includes = includes;
    function has(obj, target) {
        return obj.hasOwnProperty(target);
    }
    _.has = has;
})(_ || (_ = {}));
//# sourceMappingURL=index.js.map