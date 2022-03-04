import React, { FC, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { MainLayout } from "layouts";
import { GitHubStore } from "store/GitHubStore";
import styled from "styled-components";
import { IUserRepoItem } from "types";
import { useLocalStore } from "utils";

import { RepoPanel } from "./components";

export const Repos: FC = () => {
  const gitHubStore = useLocalStore<GitHubStore>(() => new GitHubStore());
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<IUserRepoItem[]>([]);

  const onSearchSubmit = (searchValue: string) => {};

  useEffect(() => {
    setIsLoading(true);
    gitHubStore
      .getUserReposList({
        username: "hvoyka",
        direction: "desc",
      })
      .then((response) => {
        if (response.success) setRepos(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col>
          <RepoPanel
            items={repos}
            isLoading={isLoading}
            onSearchSubmit={onSearchSubmit}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
