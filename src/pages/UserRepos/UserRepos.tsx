import React, { FC, useCallback, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { RepoBranchesDrawer, RepoList, RepoTile, SearchForm } from "components";
import { USER_EMPTY_REPO_MOCK } from "constant";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { UserReposStore } from "store/UserReposStore";
import styled from "styled-components";
import { Meta, useLocalStore } from "utils";

const UserRepos: FC = () => {
  const userReposStore = useLocalStore<UserReposStore>(
    () => new UserReposStore()
  );
  let navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState<string | undefined>("");
  const isLoading = userReposStore.meta === Meta.LOADING;
  const isError = userReposStore.meta === Meta.ERROR;

  const handleTileClick = useCallback(
    (id: number) => {
      const currentRepo = userReposStore.list.find((item) => item.id === id);
      setOwnerLogin(currentRepo?.owner?.login);
      navigate(ROUTES.USER_REPO(currentRepo?.name));
    },
    [userReposStore]
  );

  const onSearchSubmit = (searchValue: string) => {
    setOwnerLogin(searchValue);
  };

  useEffect(() => {
    userReposStore.getUserReposList({
      username: ownerLogin || "hvoyka",
      direction: "desc",
    });
  }, [ownerLogin]);

  return (
    <MainLayout>
      <Row>
        <Col>
          <Wrapper>
            <StyledSearchForm
              placeholder="Введите имя пользователя"
              onSearchSubmit={onSearchSubmit}
              isLoading={isLoading}
            />
            {isLoading && (
              <RepoTile
                item={USER_EMPTY_REPO_MOCK}
                isLoading={true}
                onClick={() => {}}
              />
            )}
            {isError && <ErrorText>Something went wrong</ErrorText>}
            <RepoList items={userReposStore.list} onClick={handleTileClick} />
            <RepoBranchesDrawer
              ownerLogin={ownerLogin}
              onClose={() => navigate(ROUTES.USER_REPOS)}
            />
          </Wrapper>
        </Col>
      </Row>
    </MainLayout>
  );
};

const Wrapper = styled.div`
  max-width: 397px;
  width: 100%;
  padding: 20px;
  background: var(--white);
`;

const StyledSearchForm = styled(SearchForm)`
  margin-bottom: 20px;
`;

const ErrorText = styled.div`
  color: var(--red1);
`;

export default observer(UserRepos);
