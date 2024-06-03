import styled from 'styled-components';

export const Button = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  height: 44px;
  line-height: 44px;
  text-transform: uppercase;
  background-color: ${(props) =>
    props.$disabled ? 'grey' : props.$primary ? 'rgb(0, 150, 64)' : '#red'};
  text-transform: uppercase;
  border: ${(props) => (props.$disabled ? '2px solid grey' : 'none')};
  border-radius: 5px;
  padding: 0 19px;
  font-family: 'dp-bold';
  font-size: 15px;
  color: ${(props) => (props.$disabled ? 'darkGrey' : props.$primary ? '#fff' : 'rgb(0, 150, 64)')};
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.$disabled ? 'grey' : props.$primary ? '#027332' : '#ffffffa4'};
  }
`;
