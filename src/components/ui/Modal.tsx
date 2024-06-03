import * as React from 'react';

import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { IoMdClose } from 'react-icons/io';

import { texts } from '../../texts/texts';

import { Button } from './Button';

type Props = {
  handleClose: () => void;
  handleGoToNextStep: () => void;
  open: boolean;
  setShowModalOnNext: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({
  open,
  handleClose,
  handleGoToNextStep,
  setShowModalOnNext,
}) => {
  const handleActionClick = () => {
    handleGoToNextStep();
    setShowModalOnNext(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-describedby='alert-dialog-description'>
      <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoMdClose />
        </IconButton>
        <h3 style={{ padding: '32px 25px 16px 25px' }}>{texts.testWhatIsHappening.modalHeading}</h3>
        <div id='alert-dialog-description' style={{ padding: '0 25px 25px' }}>
          <p>{texts.testWhatIsHappening.modalBody}</p>
        </div>

        <Button
          onClick={handleActionClick}
          style={{ alignSelf: 'flex-end', marginBottom: '25px', marginRight: '25px' }}
          $primary
        >
          {texts.ui.toliau}
        </Button>
      </div>
    </Dialog>
  );
};
