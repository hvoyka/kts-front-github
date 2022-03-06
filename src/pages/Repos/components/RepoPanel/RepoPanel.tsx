import React, { FC, useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { UserRepoItemModel } from "store/models/github";
import styled from "styled-components";

import { RepoBranchesDrawer } from "../RepoBranchesDrawer";
import { RepoList, SearchForm } from "./components";

interface RepoPanelProps {
  isLoading?: boolean;
  items: UserRepoItemModel[];
  onSearchSubmit: (searchValue: string) => void;
}

export const RepoPanel: FC<RepoPanelProps> = ({
  items,
  isLoading,
  onSearchSubmit,
}) => {
  let navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState<string | undefined>("");

  const handleTileClick = useCallback(
    (id: number) => {
      const currentRepo = items.find((item) => item.id === id);
      setOwnerLogin(currentRepo?.owner.login);
      navigate(ROUTES.REPO(currentRepo?.name));
    },
    [items]
  );

  return (
    <Root>
      <StyledSearchForm onSearchSubmit={onSearchSubmit} isLoading={isLoading} />
      <RepoList items={items} isLoading={isLoading} onClick={handleTileClick} />
      <RepoBranchesDrawer ownerLogin={ownerLogin} />
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
