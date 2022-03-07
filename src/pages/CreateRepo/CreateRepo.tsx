import React, { FC, FormEvent, useState } from "react";

import { Button, Col, Input, Row, Typography } from "antd";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { CreateUserRepoParams, UserReposStore } from "store/UserReposStore";
import styled from "styled-components";
import { useLocalStore } from "utils";

const { Title } = Typography;

const CreateRepo: FC = () => {
  const [repoName, setRepoName] = useState("");
  const userReposStore = useLocalStore<UserReposStore>(
    () => new UserReposStore()
  );

  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateRepository = (event: FormEvent) => {
    event.preventDefault();

    userReposStore.createUserRepo(repoParams);
    setRepoName("");
  };

  return (
    <MainLayout>
      <Row>
        <Col>
          <FormWrapper>
            <Title>Create repository</Title>
            <form onSubmit={handleCreateRepository}>
              <StyledInput
                type="text"
                placeholder="Repository name"
                onChange={(event) => setRepoName(event.target.value)}
                value={repoName}
              />
              <Button>Create repository</Button>
            </form>
          </FormWrapper>
        </Col>
      </Row>
    </MainLayout>
  );
};

const FormWrapper = styled.div`
  padding: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

export default observer(CreateRepo);
