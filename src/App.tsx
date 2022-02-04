import {RepoPanel} from 'components';

import React, {FC, useEffect, useState} from 'react';
import GitHubStore from 'store/GitHubStore';
import {GetUserReposListParams} from 'store/GitHubStore/types';
import {RepoItem} from 'types';

const repoMockItems: RepoItem[] = [
  {
    id: 1,
    name: 'very-long-repository-name-anddsadsasdas.',
    url: 'https://www.google.com/',
    stargazers_count: 2,
    updated_at: '2020-09-06T04:49:11Z',
    avatar_url: '/images/avatar-1.png',
    owner: {
      login: 'Test',
    },
  },
  {
    id: 2,
    name: 'repository',
    url: 'https://www.google.com/',
    stargazers_count: 2,
    updated_at: '2020-09-06T04:49:11Z',
    avatar_url: null,
    owner: {
      login: 'Test',
    },
  },
  {
    id: 3,
    name: 'mock repository',
    url: 'https://www.google.com/',
    stargazers_count: 55,
    updated_at: '2020-09-06T04:49:11Z',
    avatar_url: null,
    owner: {
      login: 'hehe',
    },
  },
];

const App: FC = () => {
  const [items, setItems] = useState(repoMockItems);

  const params: GetUserReposListParams = {
    accept: 'application/vnd.github.v3+json',
    username: 'hvoyka',
    direction: 'desc',
  };

  useEffect(() => {
    new GitHubStore()
      .getOrganizationReposList(params)

      .then((response) => {
        console.log(response);

        setItems(response.data);
      });
  }, []);

  return (
    <>
      <RepoPanel items={items} />
    </>
  );
};

export default App;
