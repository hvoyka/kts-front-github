import React, { FC, useEffect, useState } from "react";

import { Drawer } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import { GitHubStore, GetRepoBranchesParams } from "store/GitHubStore";
import styled from "styled-components";
import { IUserRepoBranch } from "types";

const gitHubStore = GitHubStore.getInstance();

export const RepoBranchesDrawer: FC = () => {
  const [branches, setBranches] = useState<IUserRepoBranch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  let { repoName } = useParams();
  let navigate = useNavigate();

  const handleDrawerClose = () => {
    navigate(ROUTES.REPOS);
  };

  useEffect(() => {
    if (repoName) {
      const repoParams: GetRepoBranchesParams = {
        owner: "hvoyka",
        repo: repoName,
      };

      setBranches([]);
      setIsLoading(true);

      (async () => {
        const response = await gitHubStore.getRepoBranches(repoParams);
        if (response.success) {
          setBranches(response.data);
        } else {
          navigate(ROUTES.REPOS);
        }
        setIsLoading(false);
      })();
    }
  }, [repoName]);

  return (
    <Drawer
      title="Repository branches"
      placement="right"
      onClose={handleDrawerClose}
      visible={!!repoName}
    >
      <NameWrapper>
        Repository: <Name>{isLoading ? "Loading..." : repoName}</Name>
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
