import React, { FC } from "react";

import { RepoItemModel } from "store/models/github";
import styled from "styled-components";

import { RepoTile } from "../RepoTile";

interface RepoListProps {
  items: RepoItemModel[];
  onClick: (id: number) => void;
}

const RepoList: FC<RepoListProps> = ({ items, onClick }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <RepoTile item={item} onClick={onClick} />
          </li>
        );
      })}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 15px;
`;

export default React.memo(RepoList);
