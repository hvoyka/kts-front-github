import React, { FC, useEffect } from "react";

import { Col, Row } from "antd";
import { useReposContext } from "context";
import { MainLayout } from "layouts";

import { RepoPanel } from "./components";

export const Repos: FC = () => {
  const { items, isLoading, loadRepos } = useReposContext();

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col>
          <RepoPanel items={items} isLoading={isLoading} />
        </Col>
      </Row>
    </MainLayout>
  );
};
