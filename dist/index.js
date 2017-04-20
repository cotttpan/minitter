"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minitter {
    constructor() {
        this._listeners = {};
    }
    on(event, listener) {
        if (has(this._listeners, event) && !includes(this._listeners[event], listener)) {
            this._listeners[event].push(listener);
        }
        else {
            this._listeners[event] = [listener];
        }
        return listener;
    }
    once(event, listener) {
        this.on(event, signature(listener, { once: true }));
    }
    off(event, listener) {
        const target = this._listeners[event];
        const idx = target.indexOf(listener);
        if (idx > -1)
            target.splice(idx, 1);
        return listener;
    }
    emit(event, arg) {
        const onceListener = [];
        const target = this._listeners[event];
        target && target.forEach((x) => {
            x(arg);
            x.once && onceListener.push(x);
        });
        onceListener.forEach((x) => this.off(event, x));
        return arg;
    }
    listenerCount(event) {
        return this._listeners[event] ? this._listeners[event].length : 0;
    }
}
exports.default = Minitter;
function includes(arr, target) {
    return arr.indexOf(target) >= 0;
}
function has(obj, target) {
    return obj.hasOwnProperty(target);
}
function signature(fn, sign) {
    const wrapped = function wrapped() {
        return fn.apply(null, arguments);
    };
    return Object.assign(wrapped, sign);
}
//# sourceMappingURL=index.js.map