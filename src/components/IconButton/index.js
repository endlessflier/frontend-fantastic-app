import clsx from 'clsx';
import styles from './IconButton.module.css';

function IconButton({ children, startIcon, className, onClick }) {
  return (
    <div className={clsx(styles.root, className)} onClick={onClick}>
      {startIcon}
      <span>{children}</span>
    </div>
  );
}

export default IconButton;
