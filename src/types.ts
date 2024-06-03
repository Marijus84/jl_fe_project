export enum StateKeys {
  step = 'step',
  completedSteps = 'completedSteps',
  wIHQuestions = 'wIHQuestions',
  crisisTestResult = 'crisisTestResult',
  mostImportantEmotion = 'mostImportantEmotion',
  kopaSteps = 'kopaSteps',
  checkedStateDoG = 'checkedStateDoG',
  textInputsValues = 'textInputsValues',
  entries = 'entries',
}

export enum Steps {
  start,
  testWhatIsHappening,
  testCrisis,
  crisisResponse,
  crisisSummary,
  wheelOfFeelings,
  kopa,
  kopaSummary,
  diaryOfGratitude,
  waysToCalmDown,
  summary,
}

export type WIHQuestion = {
  id: string;
  value: string;
  checked: boolean;
};

export type CrisisTestResult = {
  length: 'short' | 'long' | '';
  clarity: 'clear' | 'notClear' | '';
  predictability: 'predictable' | 'notPredictable' | '';
};

export enum CrisisResponseStates {
  nuLabaDiena = 'nuLabaDiena',
  okOkZinojau = 'okOkZinojau',
  sukastiDantys = 'sukastiDantys',
  slystaZeme = 'slystaZeme',
  slystaZeme2 = 'slystaZeme2',
  tbd = 'tbd',
}

export type KopaResponseState = {
  message: DisplayMessage;
  answer: string;
};

export type WaysToCalmDownCard = {
  title: string;
  image: string;
  id: number;
  isUsersEntry: boolean;
  selected: boolean;
};

export type DiaryOfGratitudeTextInput = {
  id: string;
  checked: boolean;
  value: string;
};

export type DisplayMessage = {
  kopaName: string;
  title: string;
  label: string;
  body: string;
  placeholder: string;
};
