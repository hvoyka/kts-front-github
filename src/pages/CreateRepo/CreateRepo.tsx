import React, { FC } from "react";

import { Col, Row } from "antd";
import { CreateRepoForm, Header } from "components";
import { MainLayout } from "layouts";
import styled from "styled-components";

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
