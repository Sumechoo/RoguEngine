import React from 'react';
import { CommonStyles } from './CommonStyles';

interface Props {
    title?: string;
    value: string | number;
}

export const Input: React.FC<Props> = (props) => {
    const {
        title,
        value,
    } = props;

    return (
        <div style={CommonStyles.container}>
            {title && <span>{title}</span>}
            <input value={value} placeholder={title}/>
        </div>
    )
}