import {RepoPanel} from 'components';
import {repoMockItems} from 'constants/mockItemsData';

import React, {FC, useEffect, useState} from 'react';
import GitHubStore from 'store/GitHubStore';
import {GetUserReposListParams} from 'store/GitHubStore/types';

const gitHubStore = new GitHubStore();

const App: FC = () => {
  const [items, setItems] = useState(repoMockItems);

  const params: GetUserReposListParams = {
    username: 'hvoyka',
    direction: 'desc',
  };

  useEffect(() => {
    gitHubStore.getOrganizationReposList(params).then((response) => {
      if (response.success) setItems(response.data);
    });
  }, []);

  return (
    <>
      <RepoPanel items={items} />
    </>
  );
};

export default App;
