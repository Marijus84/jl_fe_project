import { v4 as uuidv4 } from 'uuid';

import { waysToCalmDown } from '../components/steps/08-WaysToCalmDown/data';
import { texts } from '../texts/texts';
import { StateKeys, Steps } from '../types';

export const initializeStep = () => {
  return window.sessionStorage.getItem(StateKeys.step)
    ? parseInt(window.sessionStorage.getItem(StateKeys.step)!)
    : Steps.start;
};

export const initializeCompletedSteps = () => {
  return window.sessionStorage.getItem(StateKeys.completedSteps)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.completedSteps)!)
    : {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
      };
};

export const initializeWIHQuestions = () => {
  return window.sessionStorage.getItem(StateKeys.wIHQuestions)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.wIHQuestions)!)
    : Object.entries(texts.testWhatIsHappening.questions).map(([k, v]) => ({
        id: k,
        value: v,
        checked: false,
      }));
};

export const initializeCrisisTestResult = () => {
  return window.sessionStorage.getItem(StateKeys.crisisTestResult)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.crisisTestResult)!)
    : {
        length: '',
        clarity: '',
        predictability: '',
      };
};

export const initializeMostImportantEmotion = () => {
  return window.sessionStorage.getItem(StateKeys.mostImportantEmotion)
    ? window.sessionStorage.getItem(StateKeys.mostImportantEmotion)!
    : '';
};

export const initializeKopaSteps = () => {
  return window.sessionStorage.getItem(StateKeys.kopaSteps)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.kopaSteps)!)
    : [
        {
          message: { kopaName: 'whoAreYou', ...texts.kopa.whoAreYou },
          answer: '',
        },
      ];
};

export const initializeCheckedStateDoG = () => {
  return window.sessionStorage.getItem(StateKeys.checkedStateDoG)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.checkedStateDoG)!)
    : texts.diaryOfGratitude.responseOptions.map((el, i) => ({
        id: i,
        value: el,
        checked: false,
      }));
};

export const initializeTextInputsValues = () => {
  return window.sessionStorage.getItem(StateKeys.textInputsValues)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.textInputsValues)!)
    : [{ id: uuidv4(), checked: false, value: '' }];
};

export const initializeEntries = () => {
  return window.sessionStorage.getItem(StateKeys.entries)
    ? JSON.parse(window.sessionStorage.getItem(StateKeys.entries)!)
    : waysToCalmDown.map(({ title, image, id }) => ({
        title,
        image,
        id,
        isUsersEntry: false,
        selected: false,
      }));
};
