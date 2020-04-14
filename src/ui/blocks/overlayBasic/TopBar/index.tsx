import React, {FC, useState, useCallback, MouseEvent} from 'react';
import { Styles } from '../../../../types';
import { Button } from '../../Button';
import { SegmentedControl } from '../../SegmentedControl';
import { Contextual } from '../../Contextual';
import { config } from './config';
import { MenuItem } from '../../Contextual/types';

const styles: Styles = {
    mainContainer: {
        boxShadow: '0 2px 4px rgba(0,0,0,.2)',
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        background: 'rgba(240,240,240,0.8)',
    },
    title: {
        fontSize: 19,
        padding: '2px 50px',
        fontWeight: 'bold',
    },
    spacer: {
        flex: 1,
    },
}

export interface ContextualParams {
    ref: HTMLElement;
    menuItems: MenuItem[];
}

export const TopBar: FC = () => {
    const [showMenu, setShowMenu] = useState<ContextualParams | undefined>();

    const openMenu = (menuItems: MenuItem[]) => (e: MouseEvent<HTMLElement>) => setShowMenu({
        ref: e.currentTarget,
        menuItems,
    });
    const closeMenu = useCallback(() => setShowMenu(undefined), []);

    return (
        <div style={styles.mainContainer}>
            {showMenu && <Contextual onClose={closeMenu} params={showMenu} />}
            <span style={styles.title}>Project Demo</span>
            {config.configItems.map((item) => <Button title={item.title} onClick={openMenu(item.menuItems)} />)}
            {/* <SegmentedControl 
                buttons={[
                    <Button title='Play' />,
                    <Button title='Publish' />,
                    <Button title='Settings' />,
                ]}
            /> */}
            <div style={styles.spacer} />
            {/* <SegmentedControl buttons={[<Button title='Help' />]} /> */}
        </div>
    )
}