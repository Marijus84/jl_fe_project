import { CardWrapper, StyledInput } from './CardWrapper';

type Props = {
  title: string;
  image: string;
  isUsersEntry: boolean;
  handleTitleChange: (id: number, value: string) => void;
  id: number;
  selected: boolean;
  toggleSelected: (id: number) => void;
};

export const CalmDownCard: React.FC<Props> = ({
  title,
  image,
  isUsersEntry,
  handleTitleChange,
  id,
  selected,
  toggleSelected,
}) => {
  const handleOnClick = () => {
    toggleSelected(id);
  };

  const renderInput = () => {
    return (
      <>
        <label htmlFor='empty'>
          <StyledInput
            checked={selected}
            placeholder='Įrašyk savo'
            onChange={(e) => handleTitleChange(id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            value={title}
          />
        </label>
      </>
    );
  };

  return (
    <CardWrapper checked={selected} onClick={handleOnClick}>
      {isUsersEntry ? renderInput() : <p>{title}</p>}
      <img
        style={{ flex: 1, maxWidth: '70%', maxHeight: isUsersEntry ? '70%' : 'auto' }}
        src={image}
        alt='calm down image'
      />
    </CardWrapper>
  );
};
