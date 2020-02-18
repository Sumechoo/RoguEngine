import React from 'react';
import { Styles } from '../../types';
import { GameState } from '../../components/singletons/GameState';

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
}

export const HUD: React.FC = (props) => {
    const {items} = GameState.getState();

    return(
        <div style={styles.mainContainer}>
            {items.map(() => <span>item</span>)}
        </div>
    )
}