import {Input, SearchButton} from 'components';
import {GitRepoTile} from 'components/GitRepoTile';
import React, {FC} from 'react';

const App: FC = () => {
  return (
    <>
      <SearchButton
        onClick={() => {
          console.log('search button click');
        }}
      />
      <Input placeholder="Введите название организации" />
      <GitRepoTile
        repoName="very-long-repository-name-anddsadsasdas."
        userName="ktsstudio"
        starsCount={123}
        updatedAt="Updated 21 Jul"
        imageSrc="/images/avatar-1.png"
        link="https://www.google.com/"
      />
    </>
  );
};

export default App;
