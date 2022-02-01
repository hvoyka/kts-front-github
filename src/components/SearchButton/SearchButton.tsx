import {LoupeIcon} from 'components/icons';
import React, {FC} from 'react';
import './SearchButton.css';

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: FC<SearchButtonProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className="search-button">
      <LoupeIcon />
    </button>
  );
};
