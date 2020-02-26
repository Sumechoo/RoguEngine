import { IGameState } from "../types"
import { GameState } from "../components/singletons/GameState"
import { useCallback, useState, useEffect } from "react";

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