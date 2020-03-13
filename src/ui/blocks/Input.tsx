import React, { useCallback, ChangeEvent, WheelEvent } from 'react';
import { CommonStyles } from './CommonStyles';
import { Styles } from '../../types';

const styles: Styles = {
    inputBody: {
        width: 50,
        borderRadius: 3,
        padding: 2,
        margin: 5,
        border: '1px solid lightgrey',
    },
    title: {
        fontWeight: 600,
    }
}

interface Props {
    title?: string;
    value: string | number;
    onChange: (value: number) => void;
}

export const Input: React.FC<Props> = (props) => {
    const {
        title,
        value,
        onChange,
    } = props;

    const handleWheel = useCallback((e: WheelEvent<HTMLInputElement>) => {
        onChange(Number(value) + (0.001 * -e.deltaY));
    }, [onChange])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(parseFloat(e.target.value));
    }, [onChange]);

    return (
        <div style={CommonStyles.container}>
            {title && <span style={styles.title}>{title}: </span>}
            <input
                style={styles.inputBody}
                onWheel={handleWheel}
                onChange={onChangeHandler}
                value={value}
                placeholder={title}
            />
        </div>
    )
}