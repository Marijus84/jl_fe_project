import React, { ChangeEvent, useState } from 'react';

import { Checkbox } from '@mui/material';

import styles from './diaryOfGratitude.module.scss';

type Props = {
  arrayIndex: number;
  checked: boolean;
  onChange: (index: number) => void;
  onTextEntered: (value: string, id: string) => void;
  value: string;
  id: string;
};

export const TextInput: React.FC<Props> = ({
  arrayIndex,
  checked,
  onChange,
  onTextEntered,
  value,
  id,
}) => {
  const [textInputValue, setTextInputValue] = useState(value);

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTextInputValue(value);

    onTextEntered(value, id);
  };

  return (
    <>
      <Checkbox
        name='empty'
        id='empty'
        checked={checked}
        onChange={() => onChange(arrayIndex)}
        style={{
          color: checked ? '#009640' : 'black',
        }}
      />
      <label htmlFor='empty'>
        <input
          type='text'
          placeholder='Įrašyk savo variantą'
          className={styles.textInput}
          value={textInputValue}
          onChange={handleTextInputChange}
        />
      </label>
    </>
  );
};
