import {RepoTile, SearchForm} from './components';
import React, {FC} from 'react';
import {IUserRepoItem} from 'types';
import styled from 'styled-components';

interface RepoPanelProps {
  items: IUserRepoItem[];
}

export const RepoPanel: FC<RepoPanelProps> = ({items}) => {
  const handleSearchSubmit = (searchValue: string) => {
    console.log('searchValue', searchValue);
  };

  return (
    <Root>
      <StyledSearchForm onSubmit={handleSearchSubmit} />
      <List>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <RepoTile
                item={item}
                onClick={() => {
                  console.log(item.id);
                }}
              />
            </li>
          );
        })}
      </List>
    </Root>
  );
};

const Root = styled.div`
  max-width: 397px;
  width: 100%;
  padding: 20px;
  background: var(--white);
  max-height: 100vh;
  overflow-y: auto;
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
