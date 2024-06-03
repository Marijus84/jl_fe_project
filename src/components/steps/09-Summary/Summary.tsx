import React, { Dispatch, SetStateAction } from 'react';

import checkmarkImg from '/assets/images/icon_checked.svg';
import logo from '/assets/images/jaunimo-linija-logo-new.png';

import { useScreenWidth } from '../../../hooks';
import {
  CrisisTestResult,
  KopaResponseState,
  Steps,
  WIHQuestion,
  WaysToCalmDownCard,
} from '../../../types';
import { Buttons } from '../../ui';

import { PdfView } from './PdfWiew';
import styles from './summary.module.scss';

type Props = {
  crisisTestResult: CrisisTestResult;
  mostImportantEmotion: string;
  setStep: Dispatch<SetStateAction<Steps>>;
  wIHQuestions: WIHQuestion[];
  kopaSteps: KopaResponseState[];
  diaryOfGratitudeMain: {
    id: number;
    checked: boolean;
    value: string;
  }[];
  diaryOfGratitudeAdditional: {
    id: string;
    checked: boolean;
    value: string;
  }[];
  entries: WaysToCalmDownCard[];
};
export const Summary: React.FC<Props> = ({
  crisisTestResult,
  diaryOfGratitudeAdditional,
  diaryOfGratitudeMain,
  entries,
  kopaSteps,
  mostImportantEmotion,
  setStep,
  wIHQuestions,
}) => {
  const { isMobile } = useScreenWidth();
  const handleBackClick = () => {
    setStep(Steps.waysToCalmDown);
  };

  return (
    <>
      <div className={styles.summaryContainer}>
        <div className={styles.headerContainer}>
          <img className={styles.checkmarkImg} src={checkmarkImg} alt='checkmark' />
          <h3 className={styles.header}>{'Viskas'}</h3>
        </div>
        <PdfView
          crisisTestResult={crisisTestResult}
          diaryOfGratitudeAdditional={diaryOfGratitudeAdditional}
          diaryOfGratitudeMain={diaryOfGratitudeMain}
          entries={entries}
          kopaSteps={kopaSteps}
          mostImportantEmotion={mostImportantEmotion}
          wIHQuestions={wIHQuestions}
        />
        <Buttons onBackClick={handleBackClick} />
        <div className={styles.contacts}>
          <a href='https://jaunimolinija.lt' target='_blank'>
            <img className={styles.logo} src={logo} alt='logo' />
          </a>
          <p>Nemokamas pagalbos numeris:</p>
          <a href='tel:880028888' className={styles.phoneNumber}>
            <p>8 800 28888</p>
          </a>
          {isMobile && <div className={styles.bottomDecoration} />}
        </div>
      </div>
    </>
  );
};
