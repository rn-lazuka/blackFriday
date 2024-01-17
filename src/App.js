import styles from './App.module.css';
import { ReactComponent as Menu } from './assets/svg/menu-icon.svg';
import { ReactComponent as Close } from './assets/svg/close.svg';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import PopupBanner from './components/PopupBanner/PopupBanner';
import { bannerHeight, headerHeight } from './constants/PopupBanner';

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [showPopupBanner, setShowPopupBanner] = useState(false);
  const isBannerRead = localStorage.getItem('fridaySale') === 'true';
  const closeBanner = useCallback(() => {
      setShowBanner(false);
      localStorage.setItem('fridaySale', 'true');
    }, []
  );

  const resetBannerState = () => {
    setShowBanner(true);
    localStorage.removeItem('fridaySale');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowPopupBanner(scrollY > bannerHeight + headerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (isBannerRead) {
      setShowBanner(false);
    }
  }, [isBannerRead]);

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header} />
      {showBanner && <div className={styles.banner}>
        <div className={styles.giftImg} />
        <div className={styles.container}>
          <div className={styles.textWrapper}>
            <div className={styles.firstBlock}>
              <p className={`${styles.whiteText} ${styles.boldText}`}>
                Black Friday
              </p>
              <p className={styles.coma}>
                ,
              </p>
              <p className={styles.desktopText}>
                24-27 Nov
              </p>
            </div>
            <p className={styles.dot} />
            <div className={styles.secondBlock}>
              <p className={`${styles.orangeText} ${styles.stickyText} ${styles.boldText}`}>
                10%OFF
              </p>
            </div>
            <p className={styles.dot} />
            <div className={styles.codeText}>
              <p className={styles.whiteText}>
                Use code
              </p>
              <p className={`${styles.orangeText} ${styles.boldText}`}>
                10FRIDAY
              </p>
              <p className={styles.desktopText}>
                at checkout
              </p>
            </div>
          </div>
        </div>
        <button className={styles.arrowButton}>
          <p>Shop now</p>
          <Menu />
        </button>
        <button className={styles.closeButton} onClick={closeBanner}>
          <Close />
        </button>
      </div>}
      {showBanner && <PopupBanner isHidden={!showPopupBanner} closeCallback={closeBanner} />}
      {!showBanner && <button className={styles.resetButton} onClick={resetBannerState}>
        Reset to default
      </button>}
    </div>
  );
}

export default App;
