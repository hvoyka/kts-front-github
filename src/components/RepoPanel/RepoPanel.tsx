import {RepoTile, SearchForm} from './components';
import {IRepoTile} from 'types';

import React, {FC} from 'react';
import './RepoPanel.css';

interface RepoPanelProps {
  items: IRepoTile[];
}

export const RepoPanel: FC<RepoPanelProps> = ({items}) => {
  const handleSearchSubmit = (searchValue: string) => {
    console.log('searchValue', searchValue);
  };

  return (
    <div className="repo-panel">
      <SearchForm onSubmit={handleSearchSubmit} />
      <ul className="repo-panel__list">
        {items.map((repo) => {
          return (
            <li>
              <RepoTile
                key={repo.id}
                repoName={repo.repoName}
                userName={repo.userName}
                starsCount={repo.starsCount}
                updatedAt={repo.updatedAt}
                imageSrc={repo.imageSrc}
                link={repo.link}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
