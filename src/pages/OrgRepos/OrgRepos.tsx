import React, { FC, useCallback, useEffect } from "react";

import { Col, Row } from "antd";
import { RepoBranchesDrawer, RepoList, RepoTile, SearchForm } from "components";
import { USER_EMPTY_REPO_MOCK } from "constant";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { OrgReposStore } from "store/OrgReposStore";
import styled from "styled-components";
import { Meta, SortType, useLocalStore } from "utils";

const OrgRepos: FC = () => {
  const orgReposStore = useLocalStore<OrgReposStore>(() => new OrgReposStore());
  const navigate = useNavigate();
  const { org } = useParams();
  const isLoading = orgReposStore.meta === Meta.LOADING;
  const isError = orgReposStore.meta === Meta.ERROR;

  const handleTileClick = useCallback(
    (name: string) => {
      if (org && name) {
        navigate(ROUTES.ORG_REPO(org, name));
      }
    },
    [org, navigate]
  );

  const handleSearchSubmit = useCallback(
    (searchValue: string) => {
      navigate(ROUTES.ORG_REPO(searchValue));
    },
    [navigate]
  );

  const handleDrawerClose = useCallback(() => {
    navigate(org ? ROUTES.ORG_REPO(org) : ROUTES.ORG_REPOS);
  }, [navigate, org]);

  useEffect(() => {
    if (org) {
      orgReposStore.getOrganizationReposList({
        org: org,
        direction: SortType.DESC,
      });
    }
  }, [org, orgReposStore]);

  return (
    <MainLayout>
      <Row>
        <Col>
          <Wrapper>
            <StyledSearchForm
              placeholder="Введите имя организации"
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

            <RepoList items={orgReposStore.list} onClick={handleTileClick} />

            <RepoBranchesDrawer onClose={handleDrawerClose} />
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

export default observer(OrgRepos);
