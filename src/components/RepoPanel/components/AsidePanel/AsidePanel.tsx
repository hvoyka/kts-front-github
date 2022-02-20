import React, { FC, useEffect, useState } from "react";

import { Drawer } from "antd";
import GitHubStore from "store/GitHubStore/GitHubStore";
import { GetRepoBranchesParams } from "store/GitHubStore/types";
import styled from "styled-components";
import { IUserRepoBranch } from "types";
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
    const repoParams: GetRepoBranchesParams = {
      owner: "hvoyka",
      repo: repoName,
    };

    if (repoName) {
      gitHubStore.getRepoBranches(repoParams).then((response) => {
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
      <NameWrapper>
        Repository: <Name>{repoName}</Name>
      </NameWrapper>
      <Title>Branches:</Title>
      <List>
        {branches.map((branch) => (
          <ListItem key={branch.name}>{branch.name}</ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const NameWrapper = styled.h2`
  margin-bottom: 40px;
  font-size: 22px;
  line-height: 20px;
`;

const Name = styled.span`
  color: var(--green);
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 20px;
`;

const List = styled.ul`
  border: 1px solid var(--gray1);
  border-radius: 10px;
  padding: 10px;
`;

const ListItem = styled.li`
  padding-left: 10px;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--green);
  }
`;
