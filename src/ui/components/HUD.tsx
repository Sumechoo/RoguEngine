import React from 'react';
import { Styles } from '../../types';
import { useGlobalState } from '../hooks';
import { InventoryWindow } from './InventoryWindow';
import { Objectives } from './Objectives';

export const HUD_MAX_ITEMS = 8;

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inventoryItem: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        border: 'solid gray 2px',
    },
    activeInventoryItem: {
        borderColor: 'orange',
        backgroundColor: 'yellow',
    },
    interactText: {
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: 16,
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: 15,
        height: 15,
        borderRadius: '50%',
        marginRight: 5,
    },
}

interface ItemProps {
    item: string;
    active?: boolean;
}

export const Item: React.FC<ItemProps> = (props) => {
    const {item, active} = props;
    const style = {
        ...styles.inventoryItem,
        ...(active ? styles.activeInventoryItem : {}),
    };

    return <div style={style}>{item}</div>;
}

export const HUD: React.FC = () => {
    const items = useGlobalState('inventory');
    const activeItem = useGlobalState('activeItem');
    const action = useGlobalState('currentActionId');
    const visualItems: Array<string> = [];

    for(let i = 0; i < HUD_MAX_ITEMS; i++) {
        visualItems[i] = items[i] && 'none';
    }

    return(
        <div>
            {action && <div style={styles.interactText}>
                <div style={styles.dot}/>
                Press [F] to interact
            </div>}
            <Objectives />
            <InventoryWindow />
            
            <div style={styles.mainContainer}>
                {visualItems.map((item, index) => (
                    <Item
                        key={index}
                        item={item}
                        active={index === activeItem}
                    />
                ))}
            </div>
        </div>
    )
}