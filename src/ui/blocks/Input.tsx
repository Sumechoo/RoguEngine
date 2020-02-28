import React, { useCallback, ChangeEvent, WheelEvent } from 'react';
import { CommonStyles } from './CommonStyles';

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
                onWheel={handleWheel}
                onChange={onChangeHandler}
                value={value}
                placeholder={title}
            />
        </div>
    )
}