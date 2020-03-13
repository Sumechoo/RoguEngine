import React, {FC, useState} from 'react';
import { Styles } from '../../../types';
import { Button } from '../Button';

const menuItems: Array<string> = ['File', 'Edit', 'Play', 'Level', 'Instruments'];

const styles: Styles = {
    mainContainer: {
        boxShadow: '0 2px 15px rgba(0,0,0,.5)',
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(to bottom, rgba(222,239,255,1) 0%,rgba(152,190,222,1) 100%)',
    },
    title: {
        padding: '2px 50px',
        fontWeight: 'bold',
    },
    spacer: {
        flex: 1,
    },
    menuPlaceholder: {
        position: 'absolute',
        backdropFilter: 'blur(25px)',
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 5,
        border: 'solid 0.3px',
        boxShadow: '1px 1px 3px black',
        padding: '3px 10px',
        top: 20,
        left: 100,
        width: 200,
        height: 300,
        color: 'white',
    }
}

export const TopBar: FC = () => {
    const [showMenu, setShowMenu] = useState<string | undefined>();

    const openMenu = (item: string) => () => setShowMenu(item);

    return (
        <div style={styles.mainContainer}>
            {showMenu && <div style={styles.menuPlaceholder}>menu</div>}
            <span style={styles.title}>RoguEngine Editor</span>
            {menuItems.map((item) => <Button title={item} onClick={openMenu(item)} />)}
            <div style={styles.spacer}/>
            <Button title='Help' />
        </div>
    )
}