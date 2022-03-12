import React, { FC, useCallback, useEffect } from "react";

import { Col, Row } from "antd";
import { RepoBranchesDrawer, RepoList, RepoTile, SearchForm } from "components";
import { USER_EMPTY_REPO_MOCK } from "constant";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { UserReposStore } from "store/UserReposStore";
import styled from "styled-components";
import { Meta, SortType, useLocalStore } from "utils";

const UserRepos: FC = () => {
  const userReposStore = useLocalStore<UserReposStore>(
    () => new UserReposStore()
  );
  const navigate = useNavigate();
  const { user } = useParams();

  const isLoading = userReposStore.meta === Meta.LOADING;
  const isError = userReposStore.meta === Meta.ERROR;

  const handleTileClick = useCallback(
    (name: string) => {
      if (user && name) {
        navigate(ROUTES.USER_REPO(user, name));
      }
    },
    [user, navigate]
  );

  const handleSearchSubmit = useCallback(
    (searchValue: string) => {
      navigate(ROUTES.USER_REPO(searchValue));
    },
    [navigate]
  );

  useEffect(() => {
    if (user) {
      userReposStore.getUserReposList({
        username: user,
        direction: SortType.DESC,
      });
    }
  }, [user, userReposStore]);

  return (
    <MainLayout>
      <Row>
        <Col>
          <Wrapper>
            <StyledSearchForm
              placeholder="Введите имя пользователя"
              onSearchSubmit={handleSearchSubmit}
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
              onClose={() =>
                navigate(user ? ROUTES.USER_REPO(user) : ROUTES.USER_REPOS)
              }
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
