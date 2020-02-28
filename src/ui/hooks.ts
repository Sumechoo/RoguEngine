import { IGameState } from "../types"
import { GameState } from "../components/singletons/GameState"
import { useCallback, useState, useEffect } from "react";
import { IObservable } from "../components/core/interfaces";

export const useGlobalState = <K extends keyof IGameState>(key: K): IGameState[K] => {
    const state = GameState.getInstance();
    const [stateValue, setStateValue] = useState(GameState.getState()[key]);
    const subscriber = useCallback(() => {
        setStateValue(GameState.getState()[key]);
    }, [key, setStateValue]);

    useEffect(() => {
        state.addListener(subscriber);
        return () => {
            state.removeListener(subscriber);
        }
    }, [subscriber, state]);

    return stateValue;
}

export const useSubscription = <T extends IObservable<T>>(obj: T) => {
    const [value, setValue] = useState<T>(obj);

    useEffect(() => {
        obj.subscribe(setValue);
        return () => {
            obj.unsubscribe(setValue);
        };
    }, [obj, setValue]);

    return value;
} 