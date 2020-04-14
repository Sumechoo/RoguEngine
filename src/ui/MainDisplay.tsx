import React, { useState, useEffect, useCallback } from 'react';
import { CSSProperties } from "react"
import { HUD } from './components/HUD';
import { GameState } from '../components/singletons/GameState';

const styles: {[key: string]: CSSProperties} = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none',
    },
    hud: {
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'all',
    },
    button: {
        backgroundColor: 'coral',
        border: 'solid white 2px',
        padding: 2,
        color: 'white',
    }
}

export const MainDisplay: React.FC = () => {
    const [updateIndex, setIndex] = useState(0);

    const incrementIndex = useCallback(() => {
        setIndex(Date.now());
    }, []);

    useEffect(() => {
        GameState.getInstance().addListener(incrementIndex);
        return () => {
            GameState.getInstance().removeListener(incrementIndex);
        }
    }, [incrementIndex])
    
    return (
        <div key={updateIndex} style={styles.container}>
            <HUD />
        </div>
    )
}