import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Checkbox } from '@mui/material';

import { texts } from '../../../texts/texts';
import { Steps, WIHQuestion } from '../../../types';
import { Buttons, Frame, Modal } from '../../ui';

import styles from './testWhatIsHappening.module.scss';

type Props = {
  setCompletedSteps: Dispatch<SetStateAction<Record<number, boolean>>>;
  setShowModalOnNext: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<Steps>>;
  setWIHQuestions: Dispatch<SetStateAction<WIHQuestion[]>>;
  showModalOnNext: boolean;
  wIHQuestions: WIHQuestion[];
};

export const TestWhatIsHappening: React.FC<Props> = ({
  setCompletedSteps,
  setShowModalOnNext,
  setStep,
  setWIHQuestions,
  showModalOnNext,
  wIHQuestions,
}) => {
  const [position, setPosition] = useState({ top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const y = (window.innerHeight / 2 - e.pageY) / 15;
      setPosition({ top: y });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnChange = (id: string) => {
    const currentTodoIndex = wIHQuestions.findIndex((question) => question.id === id);

    const updatedTodo = {
      ...wIHQuestions[currentTodoIndex],
      checked: !wIHQuestions[currentTodoIndex].checked,
    };

    const newQuestions = [
      ...wIHQuestions.slice(0, currentTodoIndex),
      updatedTodo,
      ...wIHQuestions.slice(currentTodoIndex + 1),
    ];
    setWIHQuestions(newQuestions);
  };

  const handleBackClick = () => {
    setStep(Steps.start);
    window.scrollTo(0, 0);
  };

  const handleGoToNextStep = () => {
    setStep(Steps.testCrisis);
    setCompletedSteps((prevState) => ({ ...prevState, [Steps.testWhatIsHappening]: true }));
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    const questionsChecked = wIHQuestions.filter((question) => question.checked);
    if (questionsChecked.length <= 2 && showModalOnNext) {
      handleOpenModal();
    } else {
      handleGoToNextStep();
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Frame>
          <Modal
            open={isModalOpen}
            handleClose={handleCloseModal}
            handleGoToNextStep={handleGoToNextStep}
            setShowModalOnNext={setShowModalOnNext}
          />
          <h3 className={styles.testHeader}>{texts.testWhatIsHappening.subheading02}</h3>
          <ul style={{ listStyle: 'none' }}>
            {wIHQuestions.map(({ id, value, checked }) => {
              return (
                <li key={id}>
                  <Checkbox
                    id={id}
                    name={id}
                    value={value}
                    checked={checked}
                    onChange={() => handleOnChange(id)}
                    style={{
                      color: checked ? '#009640' : 'black',
                    }}
                  />
                  <label htmlFor={id} style={{ cursor: 'pointer' }}>
                    {value}
                  </label>
                </li>
              );
            })}
          </ul>
        </Frame>
        <Buttons onBackClick={handleBackClick} onNextClick={handleNextClick} />
      </div>
    </>
  );
};
