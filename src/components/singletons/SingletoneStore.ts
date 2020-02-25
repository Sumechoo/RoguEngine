import { Renderer } from "./Renderer";

export class SingletoneStore {
    protected static instance: SingletoneStore;
    
    protected store: Record<string, Object> = {};

    constructor() {
        SingletoneStore.instance = this;
    }

    public static setInstance<T>(instance: T, key: string) {
        SingletoneStore.instance.store[key] = instance;
    }

    public static getInstance<T>(key: string): T | undefined {
        return SingletoneStore.instance.store[key] as T;
    }
}