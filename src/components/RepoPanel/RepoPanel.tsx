import {AsidePanel, RepoTile, SearchForm} from './components';
import React, {FC, useState} from 'react';
import {IUserRepoItem} from 'types';
import styled from 'styled-components';
import {USER_EMPTY_REPO_MOCK} from 'constants/mock';

interface RepoPanelProps {
  isLoading?: boolean;
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({items, isLoading}) => {
  const [isAsidePanelVisible, setIsAsidePanelVisible] = useState(false);
  const [processableRepo, setProcessableRepo] = useState('');

  const handleAsidePanelClose = () => {
    setIsAsidePanelVisible(false);
  };

  const handleSearchSubmit = (searchValue: string) => {
    console.log('searchValue', searchValue);
  };

  const handleTileClick = (repoId: number) => {
    setIsAsidePanelVisible(true);
    setProcessableRepo(repoId.toString());
  };

  return (
    <Root>
      <StyledSearchForm onSubmit={handleSearchSubmit} isLoading={isLoading} />

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
                    onClick={() => {
                      handleTileClick(item.id);
                    }}
                  />
                </li>
              );
            })}
          </List>
        </>
      )}

      <AsidePanel
        title="Repository branches"
        repoId={processableRepo}
        isVisible={isAsidePanelVisible}
        onClose={handleAsidePanelClose}
      />
    </Root>
  );
};

const Root = styled.div`
  max-width: 397px;
  width: 100%;
  padding: 20px;
  background: var(--white);
`;

const StyledSearchForm = styled(SearchForm)`
  margin-bottom: 20px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 15px;
`;
