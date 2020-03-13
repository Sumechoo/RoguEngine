import React, {ReactNode, FC, Fragment} from 'react';
import { Styles } from '../../types';
import { TopBar } from '../blocks/overlayBasic/TopBar';

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
    },
    renderer: {
        padding: 8,
        margin: 8,
        border: '1px solid lightgrey',
        boxShadow: '0 0 3px lightgrey',
    },
    padPlaceholder: {
        flex: 1,
    }
}

interface Props {
    top?: ReactNode;
    bottom?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
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
                {top || <TopBar />}
                <div style={styles.middleContainer}>
                    <div style={styles.padPlaceholder}>{left}</div>
                    <div style={styles.renderer}>{renderer}</div>
                    <div style={styles.padPlaceholder}>{right}</div>
                </div>
                {bottom}
            </div>
        </Fragment>
    )
}