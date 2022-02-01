import {Input, SearchButton} from 'components';
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
    </>
  );
};

export default App;
