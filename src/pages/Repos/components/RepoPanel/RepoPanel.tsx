import React, { FC, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoBranchesDrawer } from "../RepoBranchesDrawer";
import { RepoList, SearchForm } from "./components";

interface RepoPanelProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({ items, isLoading }) => {
  let navigate = useNavigate();
  let { repoName } = useParams();

  const handleSearchSubmit = (searchValue: string) => {};

  const handleTileClick = useCallback((repoName: string) => {
    navigate(`/repos/${repoName}`);
  }, []);

  return (
    <Root>
      <StyledSearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />

      <RepoList
        items={items}
        isLoading={isLoading}
        onCardClick={handleTileClick}
      />

      {repoName && (
        <RepoBranchesDrawer
          title="Repository branches"
          selectedRepo={repoName}
          isVisible={!!repoName}
          onClose={() => navigate(`/repos`)}
        />
      )}
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
