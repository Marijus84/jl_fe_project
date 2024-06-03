import { Dispatch, SetStateAction } from 'react';

import { texts } from '../../../texts/texts';
import { CrisisResponseStates, CrisisTestResult, Steps } from '../../../types';
import { Buttons, Circle, DashedLine, Header } from '../../ui';

import styles from './crisisResponse.module.scss';
import { getCrisisResponseState } from './utils';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  crisisTestResult: CrisisTestResult;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const CrisisResponse: React.FC<Props> = ({
  setStep,
  crisisTestResult,
  setCompletedSteps,
}) => {
  const crisisResponseState = getCrisisResponseState(crisisTestResult);

  const handleBackClick = () => {
    setStep(Steps.testCrisis);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setStep(Steps.crisisSummary);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.crisisResponse]: true }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className={styles.responseContainer}>
        {crisisResponseState !== CrisisResponseStates.tbd && (
          <Header className={styles.header}>
            {texts.crisisResponse[crisisResponseState].heading}
          </Header>
        )}
        <DashedLine />
        {crisisResponseState !== CrisisResponseStates.tbd && (
          <p>{texts.crisisResponse[crisisResponseState].body1}</p>
        )}
        <br />
        {(crisisResponseState === CrisisResponseStates.slystaZeme ||
          crisisResponseState === CrisisResponseStates.nuLabaDiena ||
          crisisResponseState === CrisisResponseStates.sukastiDantys) && (
          <p>{texts.crisisResponse[crisisResponseState].body2}</p>
        )}
        <DashedLine />
        {crisisResponseState === CrisisResponseStates.slystaZeme && (
          <div className={styles.circleContainer1}>
            <Circle>Bjaurūs</Circle>
            <Circle>Negali numatyti</Circle>
          </div>
        )}
        <div className={styles.circleContainer2}>
          {crisisResponseState === CrisisResponseStates.nuLabaDiena && (
            <>
              <Circle>Bjaurūs</Circle>
              <Circle>Negali numatyti</Circle>
              <Circle>Greit praeina</Circle>
            </>
          )}
          {crisisResponseState === CrisisResponseStates.sukastiDantys && (
            <>
              <Circle>Bjaurūs</Circle>
              <Circle>Ilgai tęsiasi</Circle>
              <Circle>Galima prisitaikyti</Circle>
            </>
          )}
          {crisisResponseState === CrisisResponseStates.slystaZeme && (
            <>
              <Circle>Neaišku, ką daryti</Circle>
              <Circle>Sunku prisitaikyti</Circle>
              <Circle>Svarstai savižudybę</Circle>
            </>
          )}
          {crisisResponseState === CrisisResponseStates.okOkZinojau && (
            <>
              <Circle>Bjaurūs</Circle>
              <Circle>Gali numatyti</Circle>
              <Circle>Aišku, ką daryti</Circle>
            </>
          )}
          {crisisResponseState === CrisisResponseStates.slystaZeme2 && (
            <>
              <Circle>Neaišku, ką daryti</Circle>
              <Circle>Bjaurūs</Circle>
              <Circle>Tikėjaisi, kad taip bus</Circle>
              <Circle>Tenka iškęsti</Circle>
            </>
          )}
        </div>
      </div>

      <Buttons onBackClick={handleBackClick} onNextClick={handleNextClick} />
    </div>
  );
};
