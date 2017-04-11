export default class Minitter<T> {
    private _listeners: { [k: string]: Function[] } = {};

    on<K extends keyof T>(event: K, listener: Listener<T, K>) {
        if (has(this._listeners, event) && !includes(this._listeners[event], listener)) {
            this._listeners[event].push(listener);
        } else {
            this._listeners[event] = [listener];
        }
    }

    once<K extends keyof T>(event: K, listener: Listener<T, K>) {
        const wrapped = (arg: any) => {
            listener(arg);
            this.off(event, wrapped);
        };
        this.on(event, wrapped);
    }

    off<K extends keyof T>(event: K, listener: Listener<T, K>) {
        this._listeners[event] = this._listeners[event].filter(x => x !== listener);
    }

    emit<K extends keyof T>(event: K, arg: T[K]) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(f => f(arg));
        }
    }

    listenerCount<K extends keyof T>(event: K, ) {
        return this._listeners[event] ? this._listeners[event].length : 0;
    }
}

export type Listener<T, K extends keyof T> = (arg: T[K]) => any;

export function includes<T>(arr: T[], target: T) {
    return arr.indexOf(target) >= 0;
}

export function has(obj: object, target: string) {
    return obj.hasOwnProperty(target);
}
