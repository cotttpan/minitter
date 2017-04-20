export default class Minitter<T> {
    private _listeners: { [k: string]: Function[] } = {};

    on<K extends keyof T>(event: K, listener: Listener<T, K>) {
        if (has(this._listeners, event) && !includes(this._listeners[event], listener)) {
            this._listeners[event].push(listener);
        } else {
            this._listeners[event] = [listener];
        }
        return listener;
    }

    once<K extends keyof T>(event: K, listener: Listener<T, K>) {
        this.on(event, signature(listener, { once: true }));
    }

    off<K extends keyof T>(event: K, listener: Listener<T, K>) {
        const target = this._listeners[event];
        const idx = target.indexOf(listener);
        if (idx > -1) target.splice(idx, 1);
        return listener;
    }

    emit<K extends keyof T>(event: K, arg: T[K]) {
        const onceListener: Listener<T, K>[] = [];
        const target = this._listeners[event];

        target && target.forEach((x: any) => {
            x(arg);
            x.once && onceListener.push(x);
        });

        onceListener.forEach((x) => this.off(event, x));
        return arg;
    }

    listenerCount<K extends keyof T>(event: K, ) {
        return this._listeners[event] ? this._listeners[event].length : 0;
    }
}

export type Listener<T, K extends keyof T> = (arg: T[K]) => any;

function includes<T>(arr: T[], target: T) {
    return arr.indexOf(target) >= 0;
}

function has(obj: object, target: string) {
    return obj.hasOwnProperty(target);
}

function signature<T extends Function, S>(fn: T, sign: S): T & S {
    const wrapped: any = function wrapped() {
        return fn.apply(null, arguments);
    };
    return Object.assign(wrapped, sign);
}
