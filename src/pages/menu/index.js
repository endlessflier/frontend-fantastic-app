import { useState } from 'react';
import * as Icon from 'react-feather';
import MenuItem from '~/components/MenuItem';
import { MENU } from '~/constant';
import { DialIcon } from '~/assets/DialIcon';
import { RecordIcon } from '~/assets/RecordIcon';
import styles from './Menu.module.css';

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(MENU.phone);

  const handleOpenDial = () => {};

  return (
    <div className={styles.root}>
      <MenuItem
        value={MENU.phone}
        Icon={<Icon.Phone />}
        onSelect={setSelectedMenu}
        className={styles.menuItem}
        active={selectedMenu === MENU.phone}
      />
      <MenuItem
        value={MENU.contact}
        Icon={<Icon.User />}
        onSelect={setSelectedMenu}
        className={styles.menuItem}
        active={selectedMenu === MENU.contact}
      />
      <MenuItem
        value={MENU.settings}
        Icon={<DialIcon />}
        onSelect={handleOpenDial}
        className={styles.dial}
      />
      <MenuItem
        value={MENU.settings}
        Icon={<Icon.Settings />}
        onSelect={setSelectedMenu}
        className={styles.menuItem}
        active={selectedMenu === MENU.settings}
      />
      <MenuItem
        value={MENU.record}
        Icon={<RecordIcon />}
        onSelect={setSelectedMenu}
        className={styles.record}
        active={selectedMenu === MENU.record}
      />
    </div>
  );
}

export default Menu;
