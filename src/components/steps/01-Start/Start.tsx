import { Dispatch, SetStateAction } from 'react';

import { useScreenWidth } from '../../../hooks';
import { texts } from '../../../texts/texts';
import { Steps } from '../../../types';
import Logo from '../../Logo/Logo';
import { Cta, Header } from '../../ui';

import styles from './start.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const Start: React.FC<Props> = ({ setStep, setCompletedSteps }) => {
  const { isMobile } = useScreenWidth();

  const handleNextClick = () => {
    setStep(Steps.testWhatIsHappening);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.start]: true }));
    window.scrollTo(0, 0);
  };

  const extraPaddings = isMobile && { paddingTop: '10px', paddingBottom: '10px' };

  return (
    <>
      {!isMobile && (
        <div
          style={{
            left: '-50px',
            backgroundImage: 'url(/assets/images/Linija_baltam_fonui_ilga_1.svg)',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            position: 'absolute',
            width: '150%',
            height: '100%',
          }}
        />
      )}

      <div className={`${styles.heroContainer} ${styles.slideInRight}`}>
        <Logo />
        <Header
          style={{
            fontSize: `${isMobile ? '2' : '5'}rem`,
            ...extraPaddings,
          }}
        >
          {texts.testWhatIsHappening.heading}
        </Header>
        <p className={styles.subheader}>{texts.testWhatIsHappening.subheading01}</p>
        <Cta onClick={handleNextClick}>{texts.start.cta}</Cta>
        <div></div>
      </div>
    </>
  );
};
