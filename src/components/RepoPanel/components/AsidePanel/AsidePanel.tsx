import {Drawer} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {GetUserRepoBranchesParams} from 'store/GitHubStore/types';
import styled from 'styled-components';
import GitHubStore from 'store/GitHubStore/GitHubStore';
import {IUserRepoBranch} from 'types';
interface AsidePanelProps {
  title?: string;
  repoName: string;
  isVisible: boolean;
  onClose: () => void;
}

const gitHubStore = new GitHubStore();

export const AsidePanel: FC<AsidePanelProps> = ({
  title,
  repoName,
  isVisible,
  onClose,
}) => {
  const [branches, setBranches] = useState<IUserRepoBranch[]>([]);

  useEffect(() => {
    const repoParams: GetUserRepoBranchesParams = {
      owner: 'hvoyka',
      repo: repoName,
    };

    if (repoName) {
      gitHubStore.getUserRepoBranches(repoParams).then((response) => {
        if (response.success) setBranches(response.data);
      });
    }
  }, [repoName]);

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={isVisible}
    >
      <Name>Repository: {repoName}</Name>
      <Title>Branches:</Title>
      <ul>
        {branches.map((branch) => (
          <li key={branch.name}>{branch.name}</li>
        ))}
      </ul>
    </Drawer>
  );
};

const Name = styled.h2`
  margin-bottom: 40px;
  font-size: 22px;
  line-height: 20px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 20px;
`;
