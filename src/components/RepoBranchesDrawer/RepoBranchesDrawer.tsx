import React, { FC, useEffect } from "react";

import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import {
  GetRepoBranchesParams,
  RepoBranchesStore,
} from "store/RepoBranchesStore";
import { RepoInfoStore } from "store/RepoInfoStore";
import styled from "styled-components";
import { Meta, useLocalStore } from "utils";
interface RepoBranchesDrawerProps {
  onClose: () => void;
}

export const RepoBranchesDrawer: FC<RepoBranchesDrawerProps> = ({
  onClose,
}) => {
  const { user, org, repo } = useParams();

  const repoBranchesStore = useLocalStore<RepoBranchesStore>(
    () => new RepoBranchesStore()
  );
  const repoInfoStore = useLocalStore<RepoInfoStore>(() => new RepoInfoStore());
  const repoInfo = repoInfoStore.info;
  const isBranchesLoading = repoBranchesStore.meta === Meta.LOADING;
  const isInfoLoading = repoBranchesStore.meta === Meta.LOADING;

  useEffect(() => {
    if (repo && (user || org)) {
      const repoParams: GetRepoBranchesParams = {
        owner: user || org || "",
        repo: repo,
      };

      repoBranchesStore.getRepoBranches(repoParams);
      repoInfoStore.getRepoInfo(repoParams);
    }
  }, [repo, user, org, repoBranchesStore, repoInfoStore]);

  return (
    <Drawer
      title="Repository branches"
      placement="right"
      onClose={onClose}
      visible={!!repo}
    >
      <NameWrapper>
        Repository:
        <Name>{isBranchesLoading ? "Loading..." : repo}</Name>
      </NameWrapper>
      <Title>Branches:</Title>
      <List>
        {repoBranchesStore.branches.map((branch) => (
          <ListItem key={branch.name}>{branch.name}</ListItem>
        ))}
      </List>
      <Title>Info:</Title>
      {isInfoLoading ? (
        "Info loading..."
      ) : (
        <Info>
          <ul>
            <InfoItem>Name: {repoInfo?.name}</InfoItem>
            <InfoItem>Owner: {repoInfo?.owner?.login}</InfoItem>
            <InfoItem>Visibility: {repoInfo?.visibility}</InfoItem>
            <InfoItem>Updated: {repoInfo?.updatedAt.toString()}</InfoItem>
          </ul>
        </Info>
      )}
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
  font-size: 20px;
  line-height: 18px;
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

const Info = styled.div`
  border: 1px solid var(--gray1);
  border-radius: 10px;
  padding: 10px;
`;
const InfoItem = styled.li`
  margin-bottom: 15px;
`;

export default observer(RepoBranchesDrawer);
