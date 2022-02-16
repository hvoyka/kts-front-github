import {LoupeIcon} from 'components/icons';
import React, {FC} from 'react';
import styled from 'styled-components';

export const SearchButton: FC = () => {
  return (
    <Root>
      <LoupeIcon />
    </Root>
  );
};

const Root = styled.button`
  width: 50px;
  height: 50px;
  background: var(--red1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  border: 1px solid transparent;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    border: 1px solid var(--gray2);
  }

  &:disabled {
    background: var(--gray1);
  }
  &disabled:hover {
    opacity: 1;
  }
`;
