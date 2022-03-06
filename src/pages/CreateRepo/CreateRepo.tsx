import React, { FC, FormEvent, useState } from "react";

import { Button, Col, Input, Row, Typography } from "antd";
import { MainLayout } from "layouts";
import { useLocalStore } from "mobx-react-lite";
import { CreateUserRepoParams, GitHubStore } from "store/GitHubStore";
import styled from "styled-components";

const { Title } = Typography;

export const CreateRepo: FC = () => {
  const [repoName, setRepoName] = useState("");
  const gitHubStore = useLocalStore<GitHubStore>(() => new GitHubStore());

  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateRepository = (event: FormEvent) => {
    event.preventDefault();

    gitHubStore.createUserRepo(repoParams).then(() => {
      setRepoName("");
    });
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
