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

  const handleSearchSubmit = () => {
    onSearchSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <Root className={className}>
      <Input
        name="searchValue"
        id="searchValue"
        placeholder="Введите название организации"
        onChange={(value) => setSearchValue(value)}
        isLoading={isLoading}
        value={searchValue}
      />
      <SearchButton onClick={handleSearchSubmit} isLoading={isLoading} />
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 295px 50px;
  grid-template-rows: 1fr;
  gap: 12px;
`;
