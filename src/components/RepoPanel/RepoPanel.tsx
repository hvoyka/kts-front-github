import React, { FC, useCallback, useState } from "react";

import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoBranchesDrawer, RepoList, SearchForm } from "./components";

interface RepoPanelProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
  onSearchSubmit: (searchValue: string) => void;
}

export const RepoPanel: FC<RepoPanelProps> = ({
  items,
  isLoading,
  onSearchSubmit,
}) => {
  const [processableRepo, setProcessableRepo] = useState<IUserRepoItem | null>(
    null
  );

  const handleTileClick = useCallback(
    (id: number) => {
      const currentRepo = items.find((item) => item.id === id);
      setProcessableRepo(currentRepo || null);
    },
    [items]
  );

  return (
    <Root>
      <StyledSearchForm onSearchSubmit={onSearchSubmit} isLoading={isLoading} />

      <RepoList items={items} isLoading={isLoading} onClick={handleTileClick} />

      <RepoBranchesDrawer selectedRepo={processableRepo} />
    </Root>
  );
};

const Root = styled.div`
  max-width: 397px;
  width: 100%;
  padding: 20px;
  background: var(--white);
`;

const StyledSearchForm = styled(SearchForm)`
  margin-bottom: 20px;
`;
