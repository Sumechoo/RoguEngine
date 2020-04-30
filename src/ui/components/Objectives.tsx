import React, { useEffect, useCallback } from 'react';
import { Styles } from '../../types';
import { useGlobalState } from '../hooks';
import { GameState } from '../../components/singletons/GameState';
import { API } from '../../components/singletons/API';

const styles: Styles = {
    body: {
        backdropFilter: 'blur(20px)',
        position: 'absolute',
        padding: 10,
        color: 'white',
        borderRadius: 10,
        top: 30,
        left: 30,
        width: 350,
        height: 100,
        pointerEvents: 'all',
    },
    item: {
        borderRadius: 5,
        border: '1px solid white',
        fontSize: 12,
        fontWeight: 'bold',
        background: 'red',
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 4,
    }
}

interface ItemProps {
    title: string;
}

const ObjectiveItem: React.FC<ItemProps> = ({title}) => {
    return (
        <div style={styles.item}>
            <span style={{flex: 1}}>{title.toUpperCase()}</span>
            <span>[No]</span> 
        </div>
    )
}

export const Objectives: React.FC = () => {
    return (
        <div style={styles.body}>
            Current objectives:
            <ObjectiveItem title='Find keys'/>
            <ObjectiveItem title='Collect bottles'/>
        </div>
    )
}