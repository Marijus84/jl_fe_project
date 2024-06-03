import { Dispatch, SetStateAction } from 'react';

import { IoMdCheckmark } from 'react-icons/io';

import { useScreenWidth } from '../../hooks';
import { texts } from '../../texts/texts';
import { Steps } from '../../types';
import { ProgressCircle } from '../ui';

import styles from './progressBar.module.scss';

type Props = {
  currentStep: Steps;
  completedSteps: Record<number, boolean>;
  setStep: Dispatch<SetStateAction<Steps>>;
};

const ProgressBar: React.FC<Props> = ({ currentStep, completedSteps, setStep }) => {
  const { isMobile } = useScreenWidth();

  const stepsIndexesArray = Object.values(Steps).filter((v) => !isNaN(+v));
  const lastCompletedStep = Object.values(completedSteps).lastIndexOf(true);
  const stepInProgress =
    currentStep < lastCompletedStep || currentStep === lastCompletedStep
      ? lastCompletedStep + 1
      : currentStep;

  const navigateToSelectedStep = (step: number) => {
    setStep(step);
  };
  return (
    <>
      {!isMobile ? (
        <div className={styles.progressBar}>
          {stepsIndexesArray.map((step) => {
            if (step !== 0) {
              return (
                <div className={styles.container} key={step}>
                  <div className={styles.circleContainer}>
                    <div
                      className={`${styles.label} ${
                        !completedSteps[+step] &&
                        stepInProgress !== step &&
                        styles.notCompletedLabel
                      }`}
                    >
                      <p>{texts.progressBar.labels[+step]}</p>
                    </div>
                    <ProgressCircle
                      $completed={completedSteps[+step]}
                      $current={currentStep === step}
                      $stepInProgress={stepInProgress === step}
                      onClick={
                        completedSteps[+step] || stepInProgress === step
                          ? () => navigateToSelectedStep(+step)
                          : () => {}
                      }
                    >
                      {completedSteps[+step] ? <IoMdCheckmark /> : step}
                    </ProgressCircle>
                  </div>
                  {step !== stepsIndexesArray.length - 1 && <div className={styles.line}></div>}
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className={styles.mobileProgressBar}>
          <div
            style={{
              height: '10px',
              borderRadius: '5px',
              width: `${((currentStep + 1) * 100) / stepsIndexesArray.length}%`,
              backgroundColor: '#009640',
              transition: 'width 0.7s',
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
