import logo from '../../../public/assets/images/jaunimo-linija-logo-new.png';
import { useScreenWidth } from '../../hooks';

import styles from './logo.module.scss';

type Props = {
  centered?: boolean;
  skipDecoration?: boolean;
};

const Logo: React.FC<Props> = ({ centered = false, skipDecoration = true }) => {
  const { isMobile } = useScreenWidth();

  return (
    <>
      {!isMobile && !skipDecoration && <div className={styles.topDecoration} />}
      <div className={`${styles.container}`}>
        <img
          className={
            isMobile
              ? `${styles.mobile} ${centered && styles.centered}`
              : `${styles.desktop} ${centered && styles.centered}`
          }
          src={logo}
          alt='Logo'
        />
      </div>
    </>
  );
};

export default Logo;
