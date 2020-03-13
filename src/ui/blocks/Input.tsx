import React, { useCallback, ChangeEvent, WheelEvent } from 'react';
import { CommonStyles } from './CommonStyles';
import { Styles } from '../../types';

const styles: Styles = {
    inputBody: {
        width: 50,
        borderRadius: 3,
        border: 'none',
        padding: 5,
        margin: 5,
        boxShadow: '0 2px 5px rgba(0,0,0,.5)',
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
            {title && <span>{title}</span>}
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