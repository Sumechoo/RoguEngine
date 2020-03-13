import React, {FC, CSSProperties} from 'react';
import { Styles } from '../../types';

const styles: Styles = {
    root: {
        position: 'absolute',
        backdropFilter: 'blur(80px)',
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 5,
        border: 'solid 0.3px',
        boxShadow: '0 0 5px black',
        padding: '3px 10px',
        width: 200,
        height: 300,
        color: 'white',
        zIndex: 1,
    }
}

interface Props {
    onClose: () => void;
    style?: CSSProperties;
}

export const Contextual: FC<Props> = (props) => {
    const {
        onClose,
        style,
    } = props;

    return (
        <div
            onMouseOut={onClose}
            style={{
                ...styles.root,
                ...style,
            }} 
        />
    )
}