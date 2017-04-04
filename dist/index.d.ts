export default function minitter<T>(): {
    on: <K extends keyof T>(event: K, listener: (arg: T[K]) => any) => void;
    once: <K extends keyof T>(event: K, listener: (arg: T[K]) => any) => void;
    off: <K extends keyof T>(event: K, listener: (arg: T[K]) => any) => void;
    emit: <K extends keyof T>(event: K, arg: T[K]) => void;
    listenerCount: <K extends keyof T>(event: K) => number;
};
