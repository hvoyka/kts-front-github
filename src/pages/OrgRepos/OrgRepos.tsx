import React, { FC, useCallback, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { RepoBranchesDrawer, RepoList, RepoTile, SearchForm } from "components";
import { USER_EMPTY_REPO_MOCK } from "constant";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { OrgReposStore } from "store/OrgReposStore";
import styled from "styled-components";
import { Meta, useLocalStore } from "utils";

const OrgRepos: FC = () => {
  const orgReposStore = useLocalStore<OrgReposStore>(() => new OrgReposStore());
  let navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState<string | undefined>("");
  const isLoading = orgReposStore.meta === Meta.LOADING;

  const handleTileClick = useCallback(
    (id: number) => {
      const currentRepo = orgReposStore.list.find((item) => item.id === id);
      setOwnerLogin(currentRepo?.owner?.login);
      navigate(ROUTES.ORG_REPO(currentRepo?.name));
    },
    [orgReposStore]
  );

  const onSearchSubmit = (searchValue: string) => {
    setOwnerLogin(searchValue);
  };

  useEffect(() => {
    orgReposStore.getOrganizationReposList({
      org: ownerLogin || "ktsstudio",
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
            <RepoList items={orgReposStore.list} onClick={handleTileClick} />
            <RepoBranchesDrawer
              ownerLogin={ownerLogin}
              onClose={() => navigate(ROUTES.ORG_REPOS)}
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

export default observer(OrgRepos);
