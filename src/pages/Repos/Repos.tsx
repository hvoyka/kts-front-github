import React, { FC, useEffect } from "react";

import { Col, Row } from "antd";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { UserReposStore } from "store/UserReposStore";
import { Meta, useLocalStore } from "utils";

import { RepoPanel } from "./components";

const Repos: FC = () => {
  const userReposStore = useLocalStore<UserReposStore>(
    () => new UserReposStore()
  );

  const onSearchSubmit = (searchValue: string) => {};

  useEffect(() => {
    userReposStore.getUserReposList({
      username: "hvoyka",
      direction: "desc",
    });
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col>
          <RepoPanel
            items={userReposStore.userRepoList}
            isLoading={userReposStore.userRepoMeta === Meta.LOADING}
            onSearchSubmit={onSearchSubmit}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default observer(Repos);
