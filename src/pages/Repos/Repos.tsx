import React, { FC, useContext, useEffect } from "react";

import { Col, Row } from "antd";
import { ReposContext } from "context";
import { MainLayout } from "layouts";

import { RepoPanel } from "./components";

export const Repos: FC = () => {
  const { items, isLoading, loadRepos } = useContext(ReposContext);

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
