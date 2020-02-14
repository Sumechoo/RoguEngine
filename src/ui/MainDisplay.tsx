import React from 'react';
import { CSSProperties } from "react"
import { Level } from '../components/Level';
import { Demo } from '../components/levels/Demo';
import { Demo2 } from '../components/levels/Demo2';
import { Editor } from '../components/levels/Editor';
import { Columns } from '../components/levels/Columns';

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
    Demo, Demo2, Columns, Editor
];

export const MainDisplay: React.FC<Props> = (props) => {
    const {
        onSwitchLevel,
    } = props;
    
    return (
        <div style={styles.container}>
            {levelsList.map((item, index) => (
                <button
                    key={index}
                    style={styles.button}
                    onClick={() => onSwitchLevel(item)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}