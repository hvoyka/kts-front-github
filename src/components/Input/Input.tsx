import React, {FC} from 'react';
import './Input.css';

interface InputProps {
  placeholder?: string;
}

export const Input: FC<InputProps> = ({placeholder}) => {
  return <input placeholder={placeholder} className="input" />;
};
