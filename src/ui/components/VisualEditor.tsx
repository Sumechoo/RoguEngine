import React from 'react';
import { Styles } from '../../types';
import { Vector3Input } from '../blocks';
import { useSubscription } from '../hooks';
import { Transform } from '../../components/core/Transform';

interface Props {
    targetObject: Transform;
    setGameObjectParams: () => void;
}

const styles: Styles = {
    parametersForm: {
        backgroundColor: 'white',
        padding: 5,
    },
}

export const VisualEditor: React.FC<Props> = (props) => {
    const {
        targetObject,
    } = props;
    const value = useSubscription(targetObject);
    const {position} = value;

    return (
        <div>
            <div style={styles.parametersForm}>
                <Vector3Input 
                    value={position}
                    title='Position'
                />
            </div>
        </div>
    )
}