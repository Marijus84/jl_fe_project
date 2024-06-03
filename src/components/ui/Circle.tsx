import styled from 'styled-components';

import { breakpoints } from '../../const';

export const Circle = styled.div`
  border: 2px dashed black;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: 'dp-bold';
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.2;
  margin: 0 auto 2rem;
  @media only screen and (min-width: ${breakpoints.sm}) {
    width: 150px;
    height: 150px;
    font-size: 1.5rem;
    margin-bottom: initial;
  }
`;
