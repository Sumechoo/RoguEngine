import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Texture, CanvasTexture, TextureFilter, NearestFilter } from 'three';
import { GameState } from '../../components/singletons/GameState';

export const GameStateEditorUI: React.FC = () => {
    const addItem = useCallback(() => {
        const {items} = GameState.getState();

        items.push('new item');

        GameState.setState({items});
    }, [])

    return (
        <div>
            <button onClick={addItem}>AddItem</button>
        </div>
    )
}