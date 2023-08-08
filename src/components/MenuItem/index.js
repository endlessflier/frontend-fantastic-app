import clsx from 'clsx';
import styles from './MenuItem.module.css';

function MenuItem({ value, Icon, active, onSelect, className }) {
  return (
    <div
      className={clsx(className, styles.root, { [styles.selected]: active })}
      onClick={() => onSelect(value)}
    >
      {Icon}
      {active && <div className={styles.active} />}
    </div>
  );
}

export default MenuItem;
