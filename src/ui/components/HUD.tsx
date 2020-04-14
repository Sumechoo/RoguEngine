import React from 'react';
import { Styles } from '../../types';
import { useGlobalState } from '../hooks';

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
        fontSize: 16,
    }
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
    const items = useGlobalState('items');
    const activeItem = useGlobalState('activeItem');
    const action = useGlobalState('currentActionId');
    const visualItems: Array<string> = [];

    for(let i = 0; i < HUD_MAX_ITEMS; i++) {
        visualItems[i] = items[i] && 'none';
    }

    return(
        <div>
            {action && <span style={styles.interactText}>Press [F] to interact</span>}
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