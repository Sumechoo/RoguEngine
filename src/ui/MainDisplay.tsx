import React, { useState, useEffect, useCallback } from 'react';
import { CSSProperties } from "react"
import { Level } from '../components/Level';
import { Demo } from '../components/levels/Demo';
import { Demo2 } from '../components/levels/Demo2';
import { Editor } from '../components/levels/Editor';
import { Columns } from '../components/levels/Columns';
import { Dungeon } from '../components/levels/Dungeon';
import { HUD } from './components/HUD';
import { GameState } from '../components/singletons/GameState';
import { GameStateEditor } from '../components/levels/GameStateEditor';

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
    },
    hud: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        backgroundColor: 'coral',
        border: 'solid white 2px',
        padding: 2,
        color: 'white',
    }
}

interface Props {
    onSwitchLevel: (levelConstructor: typeof Level) => void;
}

const levelsList: ReadonlyArray<typeof Level> = [
    Demo, Demo2, Columns, Editor, Dungeon, GameStateEditor
];

export const MainDisplay: React.FC<Props> = (props) => {
    const {
        onSwitchLevel,
    } = props;
    const [updateIndex, setIndex] = useState(0);
    const {showDeveloperMenu} = GameState.getState();

    const incrementIndex = useCallback(() => {
        setIndex(Date.now());
    }, []);

    useEffect(() => {
        GameState.getInstance().addListener(incrementIndex);
    }, [incrementIndex])
    
    return (
        <div key={updateIndex} style={styles.container}>
            <div style={styles.hud}>
                <div>
                    {showDeveloperMenu && levelsList.map((item, index) => (
                        <button
                            key={index}
                            style={styles.button}
                            onClick={() => onSwitchLevel(item)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                <HUD />
            </div>
        </div>
    )
}