import styled from 'styled-components';

import { breakpoints } from '../../../const';

export const CardWrapper = styled.div<{ checked?: boolean }>`
  height: 260px;
  border: 2px dashed black;
  padding: 30px;
  border-radius: 45px;
  font-family: dp-medium;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.checked ? '#009640' : '#e8ddef')};
  position: relative;
  transition:
    background-color 0.3s,
    box-shadow linear 0.7s,
    opacity linear 0.7s;
  opacity: 0.8;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.checked ? '#009640' : '#9185be7d')};
    transition: all 0.25s ease-in-out;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 14px;
    padding: 14px;
  }
`;

export const StyledInput = styled.textarea<{ checked?: boolean }>`
  border: none;
  border-radius: 6px;
  outline: none;
  height: 4em;
  margin: 0 -24px;

  background-color: ${(props) => (props.checked ? '#b1e4ca' : '#fff')};
  padding: 5px;
  transition: background-color 0.3s;

  font-family: dp, sans-serif;
  font-size: 16px;

  &::placeholder {
    color: #75727e;
  }

  &:focus::placeholder {
    opacity: 0.6;
  }
`;
