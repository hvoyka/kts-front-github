import React, { FormEvent, useState } from "react";

import { Typography, Input, Button } from "antd";
import { GitHubStore, CreateUserRepoParams } from "store/GitHubStore";
import styled from "styled-components";
const { Title } = Typography;

const gitHubStore = GitHubStore.getInstance();

export const CreateRepoForm = () => {
  const [repoName, setRepoName] = useState("");

  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateRepository = (event: FormEvent) => {
    event.preventDefault();

    gitHubStore.createUserRepo(repoParams).then((result) => {
      setRepoName("");
    });
  };

  return (
    <Root>
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
    </Root>
  );
};

const Root = styled.div`
  padding: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;
