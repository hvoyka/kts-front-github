import React, { FC, useEffect, useState } from "react";

import { Drawer } from "antd";
import { GitHubStore, GetRepoBranchesParams } from "store/GitHubStore";
import styled from "styled-components";
import { IUserRepoBranch } from "types";
interface RepoBranchesDrawerProps {
  title?: string;
  selectedRepo: string;
  isVisible: boolean;
  onClose: () => void;
}

const gitHubStore = GitHubStore.getInstance();

export const RepoBranchesDrawer: FC<RepoBranchesDrawerProps> = ({
  title,
  selectedRepo,
  isVisible,
  onClose,
}) => {
  const [branches, setBranches] = useState<IUserRepoBranch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const repoParams: GetRepoBranchesParams = {
      owner: "hvoyka",
      repo: selectedRepo,
    };

    if (selectedRepo) {
      setIsLoading(true);
      setBranches([]);

      gitHubStore
        .getRepoBranches(repoParams)
        .then((response) => {
          if (response.success) setBranches(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedRepo]);

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={isVisible}
    >
      <NameWrapper>
        Repository: <Name>{isLoading ? "Loading..." : selectedRepo}</Name>
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
