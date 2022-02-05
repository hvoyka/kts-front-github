import {LoupeIcon} from 'components/icons';
import React, {FC} from 'react';
import './SearchButton.css';

export const SearchButton: FC = () => {
  return (
    <button className="search-button">
      <LoupeIcon />
    </button>
  );
};
