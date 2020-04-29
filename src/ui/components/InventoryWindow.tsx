import React, { useEffect, useCallback } from 'react';
import { Styles } from '../../types';
import { useGlobalState } from '../hooks';
import { GameState } from '../../components/singletons/GameState';

const styles: Styles = {
    body: {
        backdropFilter: 'blur(40px)',
        position: 'absolute',
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
        pointerEvents: 'all',
    }
}

export const InventoryWindow: React.FC = () => {
    const inventoryCandidate = useGlobalState('inventoryCandidate');
    const closeWindow = useCallback(() => {
        GameState.setState({inventoryCandidate: undefined});
    }, []);

    if (!inventoryCandidate) {
        return null;
    }

    return (
        <div style={styles.body}>
            InventoryWindow
            <button onClick={closeWindow}>Close</button>
        </div>
    )
}