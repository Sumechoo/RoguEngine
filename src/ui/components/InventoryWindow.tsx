import React, { useCallback } from 'react';
import { Styles } from '../../types';
import { useGlobalState } from '../hooks';
import { GameState } from '../../components/singletons/GameState';
import { API } from '../../components/singletons/API';

const styles: Styles = {
    body: {
        backdropFilter: 'blur(40px)',
        position: 'absolute',
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
        pointerEvents: 'all',
        padding: 10,
        color: 'white',
        fontSize: 20,
    },
    tabs: {
        display: 'flex',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        padding: 10,
        margin: 10,
        border: 'solid white 1px',
        borderRadius: 10,
    }
}

interface ItemProps {
    name: string;
}

const InventoryItem: React.FC<ItemProps> = ({name}) => {
    return (
        <div>
            {name}
            <button>Take\Put</button>
        </div>
    )
}

export const InventoryWindow: React.FC = () => {
    const inventoryCandidate = useGlobalState('inventoryCandidate');
    const inventory = useGlobalState('inventory');
    const closeWindow = useCallback(() => {
        API.lockMouse();
        GameState.setState({inventoryCandidate: undefined});
    }, []);

    if (!inventoryCandidate) {
        return null;
    }

    return (
        <div style={styles.body}>
            InventoryWindow
            <button onClick={closeWindow}>Close</button>
            <div style={styles.tabs}>
                <div style={styles.tab}>{inventoryCandidate.map((item) => <InventoryItem name={item} />)}</div>
                <div style={styles.tab}>{inventory.map((item) => <InventoryItem name={item} />)}</div>
            </div>
        </div>
    )
}