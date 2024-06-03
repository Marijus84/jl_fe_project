import { Dispatch, SetStateAction } from 'react';

import { texts } from '../../../texts/texts';
import { Steps } from '../../../types';
import { Buttons, Header } from '../../ui';

import EmotionWheel from './EmotionsWheelComponent';
import styles from './wheelOfFeelings.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  mostImportantEmotion: string;
  setMostImportantEmotion: Dispatch<SetStateAction<string>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const WheelOfFeelings: React.FC<Props> = ({
  setStep,
  mostImportantEmotion,
  setMostImportantEmotion,
  setCompletedSteps,
}) => {
  const handleBackClick = () => {
    setStep(Steps.crisisSummary);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.kopa);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.wheelOfFeelings]: true }));
    window.scrollTo(0, 0);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMostImportantEmotion(event.target.value);
  };

  return (
    <div>
      <Header>{texts.wheelOfFeelings.heading}</Header>
      <p>{texts.wheelOfFeelings.body1}</p>
      <br />
      <p>{texts.wheelOfFeelings.body2}</p>
      <br />
      <p>{texts.wheelOfFeelings.body3}</p>
      <br />
      <div className={styles.wheelContainer}>
        <EmotionWheel setMostImportantEmotion={setMostImportantEmotion} />
      </div>
      <br />
      <input
        type='text'
        placeholder='Arba įrašyk savo:'
        className={styles.textInput}
        value={mostImportantEmotion}
        onChange={handleTextareaChange}
      />
      <Buttons
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
        onNextClickDisabled={!mostImportantEmotion}
      />
    </div>
  );
};
