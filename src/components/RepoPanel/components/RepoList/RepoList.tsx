import { USER_EMPTY_REPO_MOCK } from "constants/mock";

import React, { FC } from "react";

import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoTile } from "../RepoTile";

interface RepoListProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
  onCardClick: (repoName: string) => void;
}

const RepoList: FC<RepoListProps> = ({ isLoading, items, onCardClick }) => {
  return (
    <>
      {isLoading ? (
        <List>
          {Array.from(Array(5)).map((_, index) => {
            return (
              <li key={index}>
                <RepoTile item={USER_EMPTY_REPO_MOCK} isLoading={true} />
              </li>
            );
          })}
        </List>
      ) : (
        <>
          <List>
            {items.map((item) => {
              return (
                <li key={item.id}>
                  <RepoTile
                    item={item}
                    onClick={() => onCardClick(item.name)}
                  />
                </li>
              );
            })}
          </List>
        </>
      )}
    </>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 15px;
`;

export default React.memo(RepoList);
