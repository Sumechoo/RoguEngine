import React, { useCallback } from 'react';
import { Styles } from '../../types';
import { Input, Vector3Input } from '../blocks';
import { useSubscription } from '../hooks';
import { Transform } from '../../components/core/Transform';
import { Vec3 } from 'cannon';

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

    const onChange = useCallback((v) => {
        targetObject.setPosition(v, true);
    }, [position, value])

    return (
        <div>
            <div style={styles.parametersForm}>
                <Vector3Input
                    title='Position'
                    value={position}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}