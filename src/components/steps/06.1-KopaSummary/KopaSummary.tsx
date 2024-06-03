import { Dispatch, SetStateAction } from 'react';

import { texts } from '../../../texts/texts';
import { Steps } from '../../../types';
import { Buttons, Frame } from '../../ui';

import styles from './kopaSummary.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const KopaSummary: React.FC<Props> = ({ setStep, setCompletedSteps }) => {
  const handleBackClick = () => {
    setStep(Steps.kopa);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.diaryOfGratitude);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.kopaSummary]: true }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Frame>
        <h3 className={styles.subheading}>{texts.kopaSummary.heading}</h3>
        <p>{texts.kopaSummary.body}</p>
      </Frame>
      <Buttons onBackClick={handleBackClick} onNextClick={handleNextClick} />
    </div>
  );
};
