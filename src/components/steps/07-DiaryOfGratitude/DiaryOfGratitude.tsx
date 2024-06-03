import React, { Dispatch, SetStateAction } from 'react';

import { Checkbox } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useScreenWidth } from '../../../hooks';
import { texts } from '../../../texts/texts';
import { DiaryOfGratitudeTextInput, Steps } from '../../../types';
import { Buttons, Frame, Header } from '../../ui';

import { TextInput } from './TextInput';
import styles from './diaryOfGratitude.module.scss';

type Props = {
  checkedState: { id: number; value: string; checked: boolean }[];
  setCheckedState: React.Dispatch<
    React.SetStateAction<{ id: number; value: string; checked: boolean }[]>
  >;
  setStep: Dispatch<SetStateAction<Steps>>;
  setTextInputsValues: React.Dispatch<React.SetStateAction<DiaryOfGratitudeTextInput[]>>;
  textInputsValues: DiaryOfGratitudeTextInput[];
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const DiaryOfGratitude: React.FC<Props> = ({
  checkedState,
  setCheckedState,
  setStep,
  setTextInputsValues,
  textInputsValues,
  setCompletedSteps,
}) => {
  const { isMobile } = useScreenWidth();

  const handleBackClick = () => {
    setStep(Steps.kopaSummary);
    window.scrollTo(0, 0);
  };
  const handleNextClick = () => {
    setStep(Steps.waysToCalmDown);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.diaryOfGratitude]: true }));
    window.scrollTo(0, 0);
  };
  const handleNextClickDisabled = !(
    checkedState.some((el) => el.checked === true) ||
    textInputsValues.map(({ checked }) => checked === true).includes(true)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? { ...item, checked: !item.checked } : { ...item }
    );
    setCheckedState(updatedCheckedState);
  };

  const onTextEntered = (value: string, id: string) => {
    const currentEntryIndex = textInputsValues.findIndex((entry) => entry.id === id);

    const updatedEntry = { ...textInputsValues[currentEntryIndex], value, checked: true };

    if (updatedEntry.value === '') {
      if (!Array.prototype.toSpliced) {
        Array.prototype.toSpliced = function (...args: [number, number, ...unknown[]]) {
          return Array.from(this).splice(...args);
        };
      }
      const newList = textInputsValues.toSpliced(currentEntryIndex, 1);
      setTextInputsValues(newList);
    } else {
      const updatedTextInputValues =
        textInputsValues.slice(-1)[0].value !== '' ||
        (currentEntryIndex === textInputsValues.length - 1 && value !== '')
          ? [...textInputsValues, { id: uuidv4(), checked: false, value: '' }]
          : [...textInputsValues];

      const newList = [
        ...updatedTextInputValues.slice(0, currentEntryIndex),
        updatedEntry,
        ...updatedTextInputValues.slice(currentEntryIndex + 1),
      ];

      setTextInputsValues(newList);
    }
  };

  const handleTextInputCheckChange = (index: number) => {
    textInputsValues[index].checked = !textInputsValues[index].checked;
    setTextInputsValues([...textInputsValues]);
  };

  return (
    <>
      <Header>{texts.diaryOfGratitude.heading}</Header>
      <p>{texts.diaryOfGratitude.body1}</p>
      <br />
      <p>{texts.diaryOfGratitude.body2}</p>
      <br />
      <p>{texts.diaryOfGratitude.body3}</p>
      <br />
      <Frame>
        <h3 className={isMobile ? styles.subHeadingMobile : styles.subheading}>
          {texts.diaryOfGratitude.subheading}
        </h3>
        <ul className={styles.listContainer}>
          {texts.diaryOfGratitude.responseOptions.map((value, index) => (
            <li key={value}>
              <Checkbox
                name={value}
                value={value}
                id={value}
                checked={checkedState[index].checked}
                style={{
                  color: checkedState[index].checked ? '#009640' : 'black',
                }}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={value}>{value}</label>
            </li>
          ))}
          {textInputsValues.map(({ id, value, checked }, index) => (
            <li className={styles.listItem} key={id}>
              <TextInput
                arrayIndex={index}
                checked={checked}
                onTextEntered={onTextEntered}
                onChange={handleTextInputCheckChange}
                value={value}
                id={id}
              />
            </li>
          ))}
        </ul>
      </Frame>
      <Buttons
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
        onNextClickDisabled={handleNextClickDisabled}
      ></Buttons>
    </>
  );
};
