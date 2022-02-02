import {RepoPanel} from 'components';

import React, {FC} from 'react';
import {IRepoTile} from 'types';

const repoItems: IRepoTile[] = [
  {
    id: 1,
    repoName: 'very-long-repository-name-anddsadsasdas.',
    userName: 'ktsstudio',
    starsCount: 123,
    updatedAt: 'Updated 21 Jul',
    imageSrc: '/images/avatar-1.png',
    link: 'https://www.google.com/',
  },
  {
    id: 2,
    repoName: 'repository-name',
    userName: 'hvoyka',
    starsCount: 1,
    updatedAt: 'Updated 15 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
  {
    id: 3,
    repoName: 'test-name',
    userName: 'test',
    starsCount: 112312,
    updatedAt: 'Updated 99 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
  {
    id: 4,
    repoName: 'test-name',
    userName: 'test',
    starsCount: 112312,
    updatedAt: 'Updated 99 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
  {
    id: 5,
    repoName: 'test-name',
    userName: 'test',
    starsCount: 112312,
    updatedAt: 'Updated 99 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
  {
    id: 6,
    repoName: 'test-name',
    userName: 'test',
    starsCount: 112312,
    updatedAt: 'Updated 99 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
  {
    id: 7,
    repoName: 'test-name',
    userName: 'test',
    starsCount: 112312,
    updatedAt: 'Updated 99 May',
    imageSrc: null,
    link: 'https://www.google.com/',
  },
];

const App: FC = () => {
  return (
    <>
      <RepoPanel items={repoItems} />
    </>
  );
};

export default App;
