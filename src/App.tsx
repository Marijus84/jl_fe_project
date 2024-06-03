import { useEffect, useState } from 'react';

import './App.css';
import Logo from './components/Logo/Logo';
import ProgressBar from './components/ProgressBar/ProgressBar';
import {
  CrisisResponse,
  CrisisSummary,
  DiaryOfGratitude,
  Kopa,
  KopaSummary,
  Start,
  Summary,
  TestCrisis,
  TestWhatIsHappening,
  WaysToCalmDown,
  WheelOfFeelings,
} from './components/steps';
import {
  initializeCheckedStateDoG,
  initializeCompletedSteps,
  initializeCrisisTestResult,
  initializeEntries,
  initializeKopaSteps,
  initializeMostImportantEmotion,
  initializeStep,
  initializeTextInputsValues,
  initializeWIHQuestions,
} from './const';
import { CrisisTestResult, KopaResponseState, StateKeys, Steps, WIHQuestion } from './types';

function App() {
  const [step, setStep] = useState(initializeStep());

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    initializeCompletedSteps()
  );

  // 02-WhatIsHappening State
  const [wIHQuestions, setWIHQuestions] = useState<WIHQuestion[]>(initializeWIHQuestions());

  const [showModalOnNext, setShowModalOnNext] = useState(true);

  // 03-TestCrisis State
  const [crisisTestResult, setCrisisTestResult] = useState<CrisisTestResult>(
    initializeCrisisTestResult()
  );

  // 05-WheelOfFeelings State
  const [mostImportantEmotion, setMostImportantEmotion] = useState<string>(
    initializeMostImportantEmotion()
  );

  // 06-Kopa State
  const [kopaSteps, setKopaSteps] = useState<KopaResponseState[]>(initializeKopaSteps());

  // 07-DiaryOfGratitude State
  const [checkedStateDoG, setCheckedStateDoG] = useState(initializeCheckedStateDoG());

  const [textInputsValues, setTextInputsValues] = useState(initializeTextInputsValues());

  // 08-WaysToCalmDown State
  const [entries, setEntries] = useState(initializeEntries());

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.step, JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.completedSteps, JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.wIHQuestions, JSON.stringify(wIHQuestions));
  }, [wIHQuestions]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.crisisTestResult, JSON.stringify(crisisTestResult));
  }, [crisisTestResult]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.mostImportantEmotion, mostImportantEmotion);
  }, [mostImportantEmotion]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.kopaSteps, JSON.stringify(kopaSteps));
  }, [kopaSteps]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.checkedStateDoG, JSON.stringify(checkedStateDoG));
  }, [checkedStateDoG]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.textInputsValues, JSON.stringify(textInputsValues));
  }, [textInputsValues]);

  useEffect(() => {
    window.sessionStorage.setItem(StateKeys.entries, JSON.stringify(entries));
  }, [entries]);

  return (
    <>
      {step === Steps.start && <Start setStep={setStep} setCompletedSteps={setCompletedSteps} />}
      {step !== Steps.start && <Logo centered skipDecoration={false} />}
      {step !== Steps.start && (
        <ProgressBar currentStep={step} setStep={setStep} completedSteps={completedSteps} />
      )}
      {step === Steps.testWhatIsHappening && (
        <TestWhatIsHappening
          setStep={setStep}
          wIHQuestions={wIHQuestions}
          setWIHQuestions={setWIHQuestions}
          setCompletedSteps={setCompletedSteps}
          showModalOnNext={showModalOnNext}
          setShowModalOnNext={setShowModalOnNext}
        />
      )}
      {step === Steps.testCrisis && (
        <TestCrisis
          setStep={setStep}
          crisisTestResult={crisisTestResult}
          setCrisisTestResult={setCrisisTestResult}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.crisisResponse && (
        <CrisisResponse
          setStep={setStep}
          crisisTestResult={crisisTestResult}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.crisisSummary && (
        <CrisisSummary setStep={setStep} setCompletedSteps={setCompletedSteps} />
      )}
      {step === Steps.wheelOfFeelings && (
        <WheelOfFeelings
          mostImportantEmotion={mostImportantEmotion}
          setMostImportantEmotion={setMostImportantEmotion}
          setStep={setStep}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.kopa && (
        <Kopa
          setStep={setStep}
          kopaSteps={kopaSteps}
          setKopaSteps={setKopaSteps}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.kopaSummary && (
        <KopaSummary setStep={setStep} setCompletedSteps={setCompletedSteps} />
      )}
      {step === Steps.diaryOfGratitude && (
        <DiaryOfGratitude
          checkedState={checkedStateDoG}
          setCheckedState={setCheckedStateDoG}
          setStep={setStep}
          setTextInputsValues={setTextInputsValues}
          textInputsValues={textInputsValues}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.waysToCalmDown && (
        <WaysToCalmDown
          setStep={setStep}
          entries={entries}
          setEntries={setEntries}
          setCompletedSteps={setCompletedSteps}
        />
      )}
      {step === Steps.summary && (
        <Summary
          setStep={setStep}
          wIHQuestions={wIHQuestions}
          crisisTestResult={crisisTestResult}
          mostImportantEmotion={mostImportantEmotion}
          kopaSteps={kopaSteps}
          diaryOfGratitudeMain={checkedStateDoG}
          diaryOfGratitudeAdditional={textInputsValues}
          entries={entries}
        />
      )}
    </>
  );
}

export default App;
