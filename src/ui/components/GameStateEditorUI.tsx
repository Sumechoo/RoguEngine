import React from 'react';
import { GameState } from '../../components/singletons/GameState';

const addItem = () => {
    const {items} = GameState.getState();

    items.push('new item');

    GameState.setState({items});
};

const clearItems = () => {
    GameState.setState({items: []});
}

export const GameStateEditorUI: React.FC = () => {

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <button onClick={clearItems}>Clear Items</button>
        </div>
    )
}