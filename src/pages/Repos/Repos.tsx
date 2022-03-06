import React, { FC, useEffect } from "react";

import { Col, Row } from "antd";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { GitHubStore } from "store/GitHubStore";
import { Meta, useLocalStore } from "utils";

import { RepoPanel } from "./components";

const Repos: FC = () => {
  const gitHubStore = useLocalStore<GitHubStore>(() => new GitHubStore());

  const onSearchSubmit = (searchValue: string) => {};

  useEffect(() => {
    gitHubStore.getUserReposList({
      username: "hvoyka",
      direction: "desc",
    });
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col>
          <RepoPanel
            items={gitHubStore.userRepoList}
            isLoading={gitHubStore.userRepoMeta === Meta.LOADING}
            onSearchSubmit={onSearchSubmit}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default observer(Repos);
