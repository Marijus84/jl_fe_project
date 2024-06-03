import React, { Dispatch, SetStateAction } from 'react';

import { Radio } from '@mui/material';

import { texts } from '../../../texts/texts';
import { CrisisTestResult, Steps } from '../../../types';
import { Buttons, Frame } from '../../ui';

import styles from './testCrisis.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  crisisTestResult: CrisisTestResult;
  setCrisisTestResult: React.Dispatch<React.SetStateAction<CrisisTestResult>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const TestCrisis: React.FC<Props> = ({
  setStep,
  crisisTestResult,
  setCrisisTestResult,
  setCompletedSteps,
}) => {
  const isNextButtonDisabled =
    !crisisTestResult.length || !crisisTestResult.clarity || !crisisTestResult.predictability;

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrisisTestResult((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBackClick = () => {
    setStep(Steps.testWhatIsHappening);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.crisisResponse);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.testCrisis]: true }));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Frame>
        <h3 className={styles.header}>{texts.testCrisis.heading}</h3>

        <div className={styles.questionContainer}>
          <p className={styles.question}>{texts.testCrisis.questions.question1.question}</p>
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.length === 'long' ? '#009640' : 'black',
            }}
            name='length'
            value='long'
            id='long'
            checked={crisisTestResult.length === 'long'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='long'>
            {texts.testCrisis.questions.question1.response1}
          </label>
          <br />
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.length === 'short' ? '#009640' : 'black',
            }}
            name='length'
            value='short'
            id='short'
            checked={crisisTestResult.length === 'short'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='short'>
            {texts.testCrisis.questions.question1.response2}
          </label>
        </div>

        <div className={styles.questionContainer}>
          <p className={styles.question}>{texts.testCrisis.questions.question2.question}</p>
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.clarity === 'clear' ? '#009640' : 'black',
            }}
            name='clarity'
            value='clear'
            id='clear'
            checked={crisisTestResult.clarity === 'clear'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='clear'>
            {texts.testCrisis.questions.question2.response1}
          </label>
          <br />
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.clarity === 'notClear' ? '#009640' : 'black',
            }}
            name='clarity'
            value='notClear'
            id='notClear'
            checked={crisisTestResult.clarity === 'notClear'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='notClear'>
            {texts.testCrisis.questions.question2.response2}
          </label>
        </div>

        <div className={styles.questionContainer}>
          <p className={styles.question}>{texts.testCrisis.questions.question3.question}</p>
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.predictability === 'predictable' ? '#009640' : 'black',
            }}
            name='predictability'
            value='predictable'
            id='predictable'
            checked={crisisTestResult.predictability === 'predictable'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='predictable'>
            {texts.testCrisis.questions.question3.response1}
          </label>
          <br />
          <Radio
            className={styles.radioInput}
            style={{
              color: crisisTestResult.predictability === 'notPredictable' ? '#009640' : 'black',
            }}
            name='predictability'
            value='notPredictable'
            id='notPredictable'
            checked={crisisTestResult.predictability === 'notPredictable'}
            onChange={onOptionChange}
          />
          <label className={styles.label} htmlFor='notPredictable'>
            {texts.testCrisis.questions.question3.response2}
          </label>
        </div>
      </Frame>
      <Buttons
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
        onNextClickDisabled={isNextButtonDisabled}
      />
    </>
  );
};
