import React, { Dispatch, SetStateAction, useRef } from 'react';

import { useAutosizeTextArea } from '../../../hooks';
import { texts } from '../../../texts/texts';
import { DisplayMessage, KopaResponseState, Steps } from '../../../types';
import { Buttons, Frame } from '../../ui';

import styles from './kopa.module.scss';

const displayMessages: DisplayMessage[] = [
  { kopaName: 'whoAreYou', ...texts.kopa.whoAreYou },
  { kopaName: 'okYouExist', ...texts.kopa.okYouExist },
  { kopaName: 'tellMe', ...texts.kopa.tellMe },
  { kopaName: 'thanksIRetreat', ...texts.kopa.thanksIRetreat },
];

interface IntroductionProps {
  body: string;
}

const Introduction: React.FC<IntroductionProps> = ({ body }) => <p>{body}</p>;

type KopaProps = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
  kopaSteps: KopaResponseState[];
  setKopaSteps: React.Dispatch<React.SetStateAction<KopaResponseState[]>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

const Kopa: React.FC<KopaProps> = ({ setStep, kopaSteps, setKopaSteps, setCompletedSteps }) => {
  const textAreaRef0 = useRef<HTMLTextAreaElement>(null);
  const textAreaRef1 = useRef<HTMLTextAreaElement>(null);
  const textAreaRef2 = useRef<HTMLTextAreaElement>(null);
  const textAreaRef3 = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef0.current, kopaSteps[0]?.answer);
  useAutosizeTextArea(textAreaRef1.current, kopaSteps[1]?.answer);
  useAutosizeTextArea(textAreaRef2.current, kopaSteps[2]?.answer);
  useAutosizeTextArea(textAreaRef3.current, kopaSteps[3]?.answer);

  const handleBackClick = () => {
    setStep(Steps.wheelOfFeelings);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.kopaSummary);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.kopa]: true }));
    window.scrollTo(0, 0);
  };

  const handleAnswerChange = (index: number, newAnswer: string) => {
    const updatedHistory = [...kopaSteps];
    updatedHistory[index].answer = newAnswer;
    if (index === kopaSteps.length - 1 && newAnswer.trim() !== '') {
      if (kopaSteps.length < displayMessages.length) {
        updatedHistory.push({ message: displayMessages[kopaSteps.length], answer: '' });
      }
    }
    setKopaSteps(updatedHistory);
  };

  const renderHistory = () =>
    kopaSteps.map((entry, index) => {
      const refs = [textAreaRef0, textAreaRef1, textAreaRef2, textAreaRef3];
      return (
        <div key={entry.message.kopaName}>
          <p className={styles.header}>
            <span className={styles.firstLetter}>{entry.message.title[0]}</span>
            {entry.message.title}
          </p>
          <p className={styles.label}>{entry.message.label}</p>
          <p className={styles.body}>{entry.message.body}</p>
          <textarea
            ref={refs[index]}
            className={styles.textArea}
            value={kopaSteps[index].answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            placeholder='Paspaudę įveskite tekstą'
            rows={1}
          />
        </div>
      );
    });

  return (
    <>
      <Introduction body={texts.kopa.introductionBody} />
      <br />
      <Frame>{renderHistory()}</Frame>
      <Buttons
        onNextClickDisabled={kopaSteps.length < displayMessages.length}
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
      />
    </>
  );
};

export default Kopa;
