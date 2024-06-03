import { texts } from '../../../texts/texts';
import { CrisisTestResult } from '../../../types';

export const getCrisisTestTextsForSummary = (crisisTestResult: CrisisTestResult) => {
  const replaceText = (text: string) => {
    return text === texts.testCrisis.questions.question3.question &&
      crisisTestResult.predictability === 'notPredictable'
      ? text.toLowerCase().replace('us:', 'ų ')
      : text.toLowerCase().replace(':', ' ');
  };

  return [
    replaceText(texts.testCrisis.questions.question1.question) +
      (crisisTestResult.length === 'long'
        ? texts.testCrisis.questions.question1.response1
        : texts.testCrisis.questions.question1.response2),
    replaceText(texts.testCrisis.questions.question2.question) +
      (crisisTestResult.clarity === 'clear'
        ? texts.testCrisis.questions.question2.response1
        : texts.testCrisis.questions.question2.response2),
    replaceText(texts.testCrisis.questions.question3.question) +
      (crisisTestResult.predictability === 'predictable'
        ? texts.testCrisis.questions.question3.response1
        : texts.testCrisis.questions.question3.response2),
  ];
};
