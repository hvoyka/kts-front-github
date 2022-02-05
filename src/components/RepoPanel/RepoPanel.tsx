import {RepoTile, SearchForm} from './components';

import React, {FC} from 'react';
import './RepoPanel.css';
import {IUserRepoItem} from 'types';

interface RepoPanelProps {
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({items}) => {
  const handleSearchSubmit = (searchValue: string) => {
    console.log('searchValue', searchValue);
  };

  return (
    <div className="repo-panel">
      <SearchForm onSubmit={handleSearchSubmit} />
      <ul className="repo-panel__list">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <RepoTile item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
