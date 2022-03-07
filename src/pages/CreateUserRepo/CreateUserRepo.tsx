import React, { FC, FormEvent, useState } from "react";

import { Button, Col, Input, Row, Typography } from "antd";
import { MainLayout } from "layouts";
import { observer } from "mobx-react-lite";
import { CreateUserRepoParams, UserReposStore } from "store/UserReposStore";
import styled from "styled-components";
import { Meta, useLocalStore } from "utils";

const { Title } = Typography;

const CreateUserRepo: FC = () => {
  const [repoName, setRepoName] = useState("");
  const userReposStore = useLocalStore<UserReposStore>(
    () => new UserReposStore()
  );
  const isError = userReposStore.meta === Meta.ERROR;
  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateUserRepository = (event: FormEvent) => {
    event.preventDefault();

    userReposStore.createUserRepo(repoParams);
    setRepoName("");
  };

  return (
    <MainLayout>
      <Row>
        <Col>
          <FormWrapper>
            <Title>Create user repository</Title>
            <form onSubmit={handleCreateUserRepository}>
              <StyledInput
                type="text"
                placeholder="Repository name"
                onChange={(event) => setRepoName(event.target.value)}
                value={repoName}
              />
              {isError && <ErrorText>Something went wrong</ErrorText>}
              <Button htmlType="submit">Create repository</Button>
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

const ErrorText = styled.div`
  color: var(--red1);
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

export default observer(CreateUserRepo);
