import React, { useState } from "react";

import { Typography, Input, Button } from "antd";
import { GitHubStore, CreateUserRepoParams } from "store/GitHubStore";
import styled from "styled-components";
const { Title } = Typography;

const gitHubStore = new GitHubStore();

export const CreateRepo = () => {
  const [repoName, setRepoName] = useState("");

  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateRepository = () => {
    gitHubStore.createUserRepo(repoParams).then((result) => {
      setRepoName("");
    });
  };

  return (
    <Root>
      <Title>Create repository</Title>
      <div>
        <StyledInput
          type="text"
          placeholder="Repository name"
          onChange={(event) => setRepoName(event.target.value)}
          value={repoName}
        />
        <Button onClick={handleCreateRepository}>Create repository</Button>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;
