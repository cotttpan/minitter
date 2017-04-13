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
        const wrapped = (arg) => {
            listener(arg);
            this.off(event, wrapped);
        };
        this.on(event, wrapped);
    }
    off(event, listener) {
        this._listeners[event] = this._listeners[event].filter(x => x !== listener);
        return listener;
    }
    emit(event, arg) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(f => f(arg));
        }
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
exports.includes = includes;
function has(obj, target) {
    return obj.hasOwnProperty(target);
}
exports.has = has;
//# sourceMappingURL=index.js.map