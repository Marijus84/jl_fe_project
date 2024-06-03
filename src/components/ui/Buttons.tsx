import { Button } from '.';

import { texts } from '../../texts/texts';

type Props = {
  onBackClick?: () => void;
  onNextClick?: () => void;
  onNextClickDisabled?: boolean;
};

export const Buttons: React.FC<Props> = ({ onBackClick, onNextClick, onNextClickDisabled }) => {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '900px',
        justifyContent: 'space-between',
        marginTop: '20px',
        marginBottom: '30px',
      }}
    >
      {onBackClick && <Button onClick={onBackClick}>{texts.ui.atgal}</Button>}
      {onNextClick && (
        <Button
          style={{ alignSelf: 'flex-end' }}
          $primary
          onClick={onNextClick}
          $disabled={onNextClickDisabled}
          disabled={onNextClickDisabled}
        >
          {texts.ui.toliau}
        </Button>
      )}
    </div>
  );
};
