import React, {FC} from 'react';
import { Styles } from '../../types';

const styles: Styles = {
    main: {
        outline: 'none',
        border: 'none',
        background: 'none',
        padding: '3px 10px',
        margin: '2px',
    }
}

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string;
}

export const Button: FC<Props> = (props) => {
    const {
        title,
        onClick,
    } = props;

    return (
        <button
            onClick={onClick}
            style={styles.main}
        >
            {title}
        </button>
    )
}