import React, {useState} from 'react';
import {Typography, Input, Button} from 'antd';
import styled from 'styled-components';
import GitHubStore from 'store/GitHubStore';
import {CreateUserRepoParams} from 'store/GitHubStore/types';
const {Title} = Typography;

const gitHubStore = new GitHubStore();

export const CreateRepo = () => {
  const [repoName, setRepoName] = useState('');

  const repoParams: CreateUserRepoParams = {
    name: repoName,
    private: true,
  };

  const handleCreateRepository = () => {
    gitHubStore.createUserRepo(repoParams).then((result) => {
      console.log(result);
      setRepoName('');
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
