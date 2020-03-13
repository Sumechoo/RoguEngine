import React, {FC} from 'react';
import { Styles } from '../../types';

const styles: Styles = {
    main: {
        outline: 'none',
        border: 'none',
        background: 'linear-gradient(to bottom, #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%)',
        borderRadius: 5,
        padding: '3px 10px',
        margin: '2px',
    }
}

interface Props {
    title: string;
    onClick?: () => void;
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