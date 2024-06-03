import { CrisisResponseStates, CrisisTestResult } from '../../../types';

export const getCrisisResponseState = (crisisTestResult: CrisisTestResult) => {
  if (crisisTestResult.length === 'short' && crisisTestResult.predictability === 'notPredictable')
    return CrisisResponseStates.nuLabaDiena;

  if (crisisTestResult.length === 'short' && crisisTestResult.predictability === 'predictable')
    return CrisisResponseStates.okOkZinojau;

  if (crisisTestResult.length === 'long' && crisisTestResult.clarity === 'clear')
    return CrisisResponseStates.sukastiDantys;

  if (
    crisisTestResult.length === 'long' &&
    crisisTestResult.predictability === 'notPredictable' &&
    crisisTestResult.clarity === 'notClear'
  )
    return CrisisResponseStates.slystaZeme;

  if (
    crisisTestResult.length === 'long' &&
    crisisTestResult.predictability === 'predictable' &&
    crisisTestResult.clarity === 'notClear'
  )
    return CrisisResponseStates.slystaZeme2;

  return CrisisResponseStates.tbd;
};
