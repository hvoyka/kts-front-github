import React, { FC } from "react";

import { Col, Row } from "antd";
import { MainLayout } from "layouts";

import { CreateRepoForm } from "./components";

export const CreateRepo: FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col>
          <CreateRepoForm />
        </Col>
      </Row>
    </MainLayout>
  );
};
