import styled from 'styled-components';

export const ProgressCircle = styled.div<{
  $completed: boolean;
  $current: boolean;
  $stepInProgress: boolean;
}>`
  border-radius: 50%;
  border: 1px solid
    ${(props) =>
      props.$current
        ? '#6a5aa5'
        : props.$completed || props.$stepInProgress
        ? '#8477b5'
        : '#776aa6'};
  color: ${(props) =>
    props.$completed || props.$current || props.$stepInProgress ? 'white' : '#776aa6'};
  background-color: ${(props) =>
    props.$completed || props.$stepInProgress
      ? props.$current
        ? '#6a5aa5'
        : '#8477b5'
      : '#bdb5da'};
  width: 30px;
  height: 30px;
  margin: 0 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'dp-medium';
  ${(props) => (props.$completed || props.$stepInProgress) && 'cursor: pointer'};
`;
