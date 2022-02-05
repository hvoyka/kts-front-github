import {Col, Row} from 'antd';
import {CreateRepo, RepoPanel} from 'components';
import {repoMockItems} from 'constants/mockItemsData';

import React, {FC, useEffect, useState} from 'react';
import GitHubStore from 'store/GitHubStore';
import {GetUserReposListParams} from 'store/GitHubStore/types';

const gitHubStore = new GitHubStore();

const App: FC = () => {
  const [items, setItems] = useState(repoMockItems);

  const userParams: GetUserReposListParams = {
    username: 'hvoyka',
    direction: 'desc',
  };

  useEffect(() => {
    gitHubStore.getUserReposList(userParams).then((response) => {
      if (response.success) setItems(response.data);
    });
  }, []);

  return (
    <main className="container">
      <Row>
        <Col>
          <RepoPanel items={items} />
        </Col>
        <Col>
          <CreateRepo />
        </Col>
      </Row>
    </main>
  );
};

export default App;
