export default function minitter<T>() {
    const listeners: { [k: string]: Function[] } = {};
    return {
        on,
        once,
        off,
        emit,
        listenerCount,
    };

    function listenerCount<K extends keyof T>(event: K) {
        return listeners[event] ? listeners[event].length : 0;
    }

    function on<K extends keyof T>(event: K, listener: (arg: T[K]) => any) {
        if (_.has(listeners, event) && !_.includes(listeners[event], listener)) {
            listeners[event].push(listener);
        } else {
            listeners[event] = [listener];
        }
    }

    function once<K extends keyof T>(event: K, listener: (arg: T[K]) => any) {
        on(event, wrapped);

        function wrapped() {
            listener.apply(null, arguments);
            off(event, wrapped);
        }
    }

    function off<K extends keyof T>(event: K, listener: (arg: T[K]) => any) {
        listeners[event] = listeners[event].filter(l => l !== listener);
    }

    function emit<K extends keyof T>(event: K, arg: T[K]) {
        if (listeners[event]) {
            listeners[event].forEach(f => f.call(null, arg));
        }
    }
}

namespace _ {
    export function includes<T>(arr: T[], target: T) {
        return arr.indexOf(target) >= 0;
    }
    export function has(obj: object, target: string) {
        return obj.hasOwnProperty(target);
    }
}
