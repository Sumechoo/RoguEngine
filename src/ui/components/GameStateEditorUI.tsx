import React from 'react';
import { GameState } from '../../components/singletons/GameState';

const addItem = () => {
    const {inventory} = GameState.getState();

    inventory.push('new item');

    GameState.setState({inventory});
};

const clearItems = () => {
    GameState.setState({inventory: []});
}

export const GameStateEditorUI: React.FC = () => {

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <button onClick={clearItems}>Clear Items</button>
        </div>
    )
}