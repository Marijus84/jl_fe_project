import { Dispatch, SetStateAction } from 'react';

import { texts } from '../../../texts/texts';
import { Steps } from '../../../types';
import { Buttons, Frame } from '../../ui';

import styles from './crisisSummary.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const CrisisSummary: React.FC<Props> = ({ setStep, setCompletedSteps }) => {
  const handleBackClick = () => {
    setStep(Steps.crisisResponse);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.wheelOfFeelings);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.crisisSummary]: true }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Frame>
        <h3 className={styles.subheading}>{texts.crisisSummary.heading}</h3>
        <p>{texts.crisisSummary.body}</p>
        <p>
          {texts.crisisSummary.body1}{' '}
          <a href={texts.crisisSummary.url} target='blank'>
            {texts.crisisSummary.label}
          </a>
        </p>
      </Frame>
      <Buttons onBackClick={handleBackClick} onNextClick={handleNextClick} />
    </div>
  );
};
