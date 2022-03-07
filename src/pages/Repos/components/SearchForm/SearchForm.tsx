import React, { FC, useState } from "react";

import { Input } from "components";
import styled from "styled-components";

import { SearchButton } from "../SearchButton";

interface SearchFormProps {
  onSearchSubmit: (searchValue: string) => void;
  className?: string;
  isLoading?: boolean;
}

export const SearchForm: FC<SearchFormProps> = ({
  className,
  isLoading,
  onSearchSubmit,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchSubmit(searchValue);
  };

  return (
    <Root className={className} onSubmit={handleSearchSubmit}>
      <Input
        name="searchValue"
        id="searchValue"
        placeholder="Введите имя владельца"
        onChange={(value) => setSearchValue(value)}
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
