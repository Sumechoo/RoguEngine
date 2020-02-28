export interface ISerializable {
    serialize: () => string;
    deserialize: (data: string) => any;
}

export type UpdateListener<T> = (v: T) => void;

export interface IObservable<T> {
    subscribe: (listener: UpdateListener<T>) => void;
    unsubscribe: (listener: UpdateListener<T>) => void;
    notify: () => void;
}