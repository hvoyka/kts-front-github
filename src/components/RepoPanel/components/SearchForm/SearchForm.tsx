import {Input} from 'components';
import {SearchButton} from '../SearchButton';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSubmit: (searchValue: string) => void;
}

export const SearchForm: FC<SearchFormProps> = ({onSubmit}) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <Input
        name="searchValue"
        id="searchValue"
        placeholder="Введите название организации"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        value={searchValue}
      />
      <SearchButton />
    </form>
  );
};
