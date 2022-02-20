import React, { FC, useCallback, useState } from "react";

import styled from "styled-components";
import { IUserRepoItem } from "types";

import { AsidePanel, RepoList, SearchForm } from "./components";

interface RepoPanelProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({ items, isLoading }) => {
  const [isAsidePanelVisible, setIsAsidePanelVisible] = useState(false);
  const [processableRepo, setProcessableRepo] = useState("");

  const handleSearchSubmit = (searchValue: string) => {};

  const handleTileClick = useCallback((repoName: string) => {
    setIsAsidePanelVisible(true);
    setProcessableRepo(repoName);
  }, []);

  return (
    <Root>
      <StyledSearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />

      <RepoList
        items={items}
        isLoading={isLoading}
        onCardClick={handleTileClick}
      />

      <AsidePanel
        title="Repository branches"
        repoName={processableRepo}
        isVisible={isAsidePanelVisible}
        onClose={() => setIsAsidePanelVisible(false)}
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
