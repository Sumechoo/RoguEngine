import React, {FC, ReactElement} from 'react';
import { Styles } from '../../types';
import { Button } from './Button';

const styles: Styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%)',
        border: 'solid lightgrey 1px',
        boxShadow: '0 0 3px lightgrey',
        borderRadius: 5,
    },
    spacer: {
        borderLeft: 'solid lightgray 1px',
    }
}

interface Props {
    buttons: ReadonlyArray<ReactElement>;
}

export const SegmentedControl: FC<Props> = (props) => {
    const {buttons} = props;
    // useMemo here
    const spacedButtons: Array<ReactElement> = [];

    buttons.forEach((button, index) => {
        spacedButtons.push(button);
        if(index !== buttons.length - 1) {
            spacedButtons.push(<div style={styles.spacer}/>);
        }
    })

    return (
        <div style={styles.root}>
            {spacedButtons}
        </div>
    )
}