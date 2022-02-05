import {IUserRepoItem} from 'types';

export const repoMockItems: IUserRepoItem[] = [
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
