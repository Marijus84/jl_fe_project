import styled from 'styled-components';

import { breakpoints } from '../../const';

export const Frame = styled.div`
  border: 2px dashed black;
  padding: 45px;
  border-radius: 45px;
  font-family: 'dp-medium';
  font-size: 16px;
  background-color: #e0dbf3;
  opacity: 0.8;
  max-width: 900px;
  @media only screen and (max-width: ${breakpoints.md}) {
    padding: 30px 15px;
    border-radius: 30px;
  }
`;
