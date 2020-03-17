import React, { useState, useEffect, useCallback } from 'react';
import { CSSProperties } from "react"
import { Level } from '../components/Level';
import { Editor } from '../components/levels/Editor';
import { HUD } from './components/HUD';
import { GameState } from '../components/singletons/GameState';
import { GizmosEditor } from '../components/levels/GizmosEditor';
import { Sandbox } from '../components/levels/Sandbox';

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

const levelsList: ReadonlyArray<typeof Level> = [
    GizmosEditor, Sandbox, Editor
];

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