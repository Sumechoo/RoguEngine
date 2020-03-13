import React, { useCallback } from 'react';
import { Vec3 } from 'cannon';
import { CommonStyles } from './CommonStyles';
import { Styles } from '../../types';
import { Input } from './Input';

interface Props {
    value: Vec3;
    onChange: (v: Vec3) => void,
    title?: string;
}

const styles: Styles = {
    vertical: {
        display: 'flex',
        flexDirection: 'row',
    }
}

export const Vector3Input: React.FC<Props> = (props) => {
    const {
        value,
        title,
        onChange,
    } = props;
    const onChangeHandler = (param: keyof Vec3) => (v: number) => {
        const newValue = value.clone();
        (newValue[param] as any) = v;
        onChange(newValue);
    }

    return (
        <div >
            {title && <span>{title}</span>}
            <div style={styles.vertical}>
                <Input value={value.x} title='x' onChange={onChangeHandler('x')} />
                <Input value={value.y} title='y' onChange={onChangeHandler('y')} />
                <Input value={value.z} title='z' onChange={onChangeHandler('z')} />
            </div>
        </div>
    )
}