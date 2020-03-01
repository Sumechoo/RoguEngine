import React, {ReactNode, FC, Fragment} from 'react';
import { Styles } from '../../types';

const styles: Styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    middleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}

interface Props {
    top: ReactNode;
    bottom: ReactNode;
    left: ReactNode;
    right: ReactNode;
    renderer: ReactNode;
}

export const Overlay: FC<Props> = (props) => {
    const {
        top,
        bottom,
        left,
        right,
        renderer,
    } = props;
    
    return (
        <Fragment>
            <div>
                {top}
                <div style={styles.middleContainer}>
                    {left}
                    {renderer}
                    {right}
                </div>
                {bottom}
            </div>
        </Fragment>
    )
}