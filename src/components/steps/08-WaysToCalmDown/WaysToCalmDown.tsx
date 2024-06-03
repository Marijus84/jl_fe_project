import React, { Dispatch, SetStateAction } from 'react';

import addImage from '/assets/images/add-circled.svg';

import { texts } from '../../../texts/texts';
import { Steps, WaysToCalmDownCard } from '../../../types';
import { Buttons, Header } from '../../ui';

import { CalmDownCard } from './CalmDownCard';
import { CardWrapper } from './CardWrapper';
import styles from './waysToCalmDown.module.scss';

type Props = {
  setStep: Dispatch<SetStateAction<Steps>>;
  entries: WaysToCalmDownCard[];
  setEntries: Dispatch<SetStateAction<WaysToCalmDownCard[]>>;
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
};

export const WaysToCalmDown: React.FC<Props> = ({
  entries,
  setEntries,
  setStep,
  setCompletedSteps,
}) => {
  const handleBackClick = () => {
    setStep(Steps.diaryOfGratitude);
    window.scrollTo(0, 0);
  };
  const handleNextClick = () => {
    setStep(Steps.summary);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.waysToCalmDown]: true }));
    window.scrollTo(0, 0);
  };

  const handleAddingNew = () => {
    setEntries((prev) => [
      ...prev,
      {
        isUsersEntry: true,
        image: 'assets/images/ways-to-calm-down/custom.svg',
        title: '',
        id: Date.now(),
        selected: false,
      },
    ]);
  };

  const handleTitleChange = (id: number, value: string) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            title: value,
            selected: !!value,
          };
        }
        return entry;
      })
    );
  };

  const toggleSelected = (id: number) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            selected: !entry.selected,
          };
        }
        return entry;
      })
    );
  };

  const handleNextClickDisabled = () => {
    return !entries?.some(({ selected }) => selected);
  };

  return (
    <>
      <Header>{texts.waysToCalmDown.heading}</Header>
      <p className={styles.subheading}>{texts.waysToCalmDown.subheading}</p>
      <div className={styles.cardsContainer}>
        {entries?.map(({ title, image, isUsersEntry, id, selected }) => (
          <CalmDownCard
            key={id}
            id={id}
            title={title}
            image={image}
            isUsersEntry={isUsersEntry}
            selected={selected}
            handleTitleChange={handleTitleChange}
            toggleSelected={toggleSelected}
          />
        ))}
        <CardWrapper onClick={handleAddingNew}>
          <p>Įsirašyk savo</p>
          <img className={styles.addImage} src={addImage} alt='add image' />
        </CardWrapper>
      </div>
      <Buttons
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
        onNextClickDisabled={handleNextClickDisabled()}
      ></Buttons>
    </>
  );
};
