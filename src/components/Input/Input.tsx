import React, {ChangeEvent, FC} from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({placeholder, id, name, ...props}) => {
  return (
    <StyledInput
      name={name}
      id={id}
      placeholder={placeholder}
      className="input"
      {...props}
    />
  );
};

const StyledInput = styled.input`
  background: var(--white);
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid var(--gray1);
  padding: 15px 12px;
  max-width: 295px;
  width: 100%;
  font-size: 14px;

  &:focus {
    border: 1px solid var(--red1);
  }

  &:disabled {
    background: var(--gray3);
    border: 1px solid var(--gray2);
  }
`;
