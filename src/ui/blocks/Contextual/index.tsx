import React, {FC, CSSProperties, useEffect} from 'react';
import { Styles } from '../../../types';
import {ContextualParams} from '../overlayBasic/TopBar';

const styles: Styles = {
    root: {
        position: 'absolute',
        backdropFilter: 'blur(80px)',
        backgroundColor: 'rgba(255,255,255,.4)',
        borderRadius: 5,
        border: 'solid 0.3px',
        boxShadow: '0 0 15px grey',
        padding: '5px 20px',
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        color: 'black',
    }
}

interface Props {
    onClose: () => void;
    params: ContextualParams;
    style?: CSSProperties;
}

const Spacer: FC = () => {
    return (
        <div 
            style={{
                borderTop: 'solid lightgray 1px',
            }}
        />
    )
}

export const Contextual: FC<Props> = (props) => {
    const {
        onClose,
        style,
        params,
    } = props;

    useEffect(() => {
        document.addEventListener('click', onClose);
        return () => document.removeEventListener('click', onClose);
    }, []);

    return (
        <div
            style={{
                ...styles.root,
                ...style,
                left: params.ref.offsetLeft,
                top: params.ref.offsetTop + params.ref.offsetHeight,
            }} 
        >
            {params.menuItems.map((item) => <span onClick={item.action} >{item.title}</span>)}
        </div>
    )
}