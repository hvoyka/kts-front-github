import React, { FC, useCallback, useState } from "react";

import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoBranchesDrawer, RepoList, SearchForm } from "./components";

interface RepoPanelProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({ items, isLoading }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [processableRepo, setProcessableRepo] = useState({ name: "" });

  const handleSearchSubmit = (searchValue: string) => {};

  const handleTileClick = useCallback((repoName: string) => {
    setIsDrawerVisible(true);
    setProcessableRepo({ name: repoName });
  }, []);

  return (
    <Root>
      <StyledSearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />

      <RepoList
        items={items}
        isLoading={isLoading}
        onCardClick={handleTileClick}
      />

      <RepoBranchesDrawer
        title="Repository branches"
        selectedRepo={processableRepo}
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
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
