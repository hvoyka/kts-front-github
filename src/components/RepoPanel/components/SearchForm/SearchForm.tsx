import {Input} from 'components';
import {SearchButton} from '../SearchButton';
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';

import styled from 'styled-components';

interface SearchFormProps {
  onSubmit: (searchValue: string) => void;
  className?: string;
  isLoading?: boolean;
}

export const SearchForm: FC<SearchFormProps> = ({
  className,
  isLoading,
  onSubmit,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <Root className={className} onSubmit={handleSearchSubmit}>
      <Input
        name="searchValue"
        id="searchValue"
        placeholder="Введите название организации"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        isLoading={isLoading}
        value={searchValue}
      />
      <SearchButton isLoading={isLoading} />
    </Root>
  );
};

const Root = styled.form`
  display: grid;
  grid-template-columns: 295px 50px;
  grid-template-rows: 1fr;
  gap: 12px;
`;
