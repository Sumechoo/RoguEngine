import React from 'react';
import { Vec3 } from 'cannon';
import { CommonStyles } from './CommonStyles';
import { Styles } from '../../types';

interface Props {
    value: Vec3;
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
    } = props;

    return (
        <div style={CommonStyles.container}>
            {title && <span>{title}</span>}
            <div style={styles.vertical}>
                <input value={value.x} placeholder='x' />
                <input value={value.y} placeholder='y' />
                <input value={value.z} placeholder='z' />
            </div>
        </div>
    )
}