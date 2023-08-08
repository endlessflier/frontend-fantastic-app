import clsx from 'clsx';
import * as Icon from 'react-feather';
import { PHONE_TAB } from '~/constant';
import { LogoIcon } from '~/assets/LogoIcon';
import styles from './Navbar.module.css';

function Navbar({ value, onChange }) {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <LogoIcon />
        <span>Aircall</span>
      </div>
      <div
        className={clsx(styles.tabItem, {
          [styles.selected]: value === PHONE_TAB.activity.key,
        })}
        onClick={() => onChange(PHONE_TAB.activity.key)}
      >
        <span>{PHONE_TAB.activity.label}</span>
        <Icon.MoreVertical />
      </div>
      <div
        className={clsx(styles.tabItem, {
          [styles.selected]: value === PHONE_TAB.archive.key,
        })}
        onClick={() => onChange(PHONE_TAB.archive.key)}
      >
        <span>{PHONE_TAB.archive.label}</span>
        <Icon.MoreVertical />
      </div>
    </div>
  );
}

export default Navbar;
