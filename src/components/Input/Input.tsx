import React, {ChangeEvent, FC} from 'react';
import './Input.css';

interface InputProps {
  placeholder?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({placeholder, id, name, ...props}) => {
  return (
    <input
      name={name}
      id={id}
      placeholder={placeholder}
      className="input"
      {...props}
    />
  );
};
