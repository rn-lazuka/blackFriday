import styles from './PopupBanner.module.css';
import { ReactComponent as Close } from '../../assets/svg/close.svg';

const PopupBanner = ({isHidden, closeCallback}) => {

  return (
    <div className={`${ isHidden? '' : styles.appear } ${styles.popupBanner}`}>
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={closeCallback}>
          <Close />
        </button>
      </div>
      <div className={styles.container}>
        <p className={styles.whiteText}>
          Black Friday
        </p>
        <p className={styles.gradientText}>
          10%OFF
        </p>
        <div className={styles.textWrapper}>
          <p>Use code</p>
          <p className={styles.orangeText}>10FRIDAY</p>
          <p>at checkout</p>
        </div>
        <button className={styles.btn}>
          <p>Shop now</p>
          <p className={styles.desktopText}>through Monday</p>
        </button>
      </div>
    </div>
  );
};

export default PopupBanner;
