import React, { FC, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { MainLayout } from "layouts";
import { GitHubStore, GetUserReposListParams } from "store/GitHubStore";
import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoPanel } from "./components";

const gitHubStore = new GitHubStore();

export const Repos: FC = () => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const userParams: GetUserReposListParams = {
    username: "hvoyka",
    direction: "desc",
  };

  useEffect(() => {
    setIsRequestLoading(true);
    gitHubStore
      .getUserReposList(userParams)
      .then((response) => {
        if (response.success) setItems(response.data);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col>
          <RepoPanel items={items} isLoading={isRequestLoading} />
        </Col>
      </Row>
    </MainLayout>
  );
};
