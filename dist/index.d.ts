export default class Minitter<T> {
    private _listeners;
    on<K extends keyof T>(event: K, listener: Listener<T, K>): Listener<T, K>;
    once<K extends keyof T>(event: K, listener: Listener<T, K>): void;
    off<K extends keyof T>(event: K, listener: Listener<T, K>): Listener<T, K>;
    emit<K extends keyof T>(event: K, arg: T[K]): T[K];
    listenerCount<K extends keyof T>(event: K): number;
}
export declare type Listener<T, K extends keyof T> = (arg: T[K]) => any;
