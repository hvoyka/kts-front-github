import React, { FC, useEffect } from "react";

import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import {
  GetRepoBranchesParams,
  RepoBranchesStore,
} from "store/RepoBranchesStore";
import styled from "styled-components";
import { Meta, useLocalStore } from "utils";
interface RepoBranchesDrawerProps {
  ownerLogin?: string;
}

export const RepoBranchesDrawer: FC<RepoBranchesDrawerProps> = ({
  ownerLogin,
}) => {
  let { repoName } = useParams();
  let navigate = useNavigate();

  const repoBranchesStore = useLocalStore<RepoBranchesStore>(
    () => new RepoBranchesStore()
  );

  const handleDrawerClose = () => {
    navigate(ROUTES.USER_REPOS);
  };

  useEffect(() => {
    if (repoName && ownerLogin) {
      const repoParams: GetRepoBranchesParams = {
        owner: ownerLogin,
        repo: repoName,
      };

      repoBranchesStore.getRepoBranches(repoParams);
    }
  }, [repoName, ownerLogin]);

  return (
    <Drawer
      title="Repository branches"
      placement="right"
      onClose={handleDrawerClose}
      visible={!!repoName}
    >
      <NameWrapper>
        Repository:
        <Name>
          {repoBranchesStore.meta === Meta.LOADING ? "Loading..." : repoName}
        </Name>
      </NameWrapper>
      <Title>Branches:</Title>
      <List>
        {repoBranchesStore.branches.map((branch) => (
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

export default observer(RepoBranchesDrawer);
