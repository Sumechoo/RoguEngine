import React from 'react';
import { Styles } from '../../types';

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
}

interface Props {
    items: Array<string>;
}

export const HUD: React.FC<Props> = (props) => {
    const {items} = props;

    return(
        <div style={styles.mainContainer}>
            {items.map(() => <span>item</span>)}
        </div>
    )
}