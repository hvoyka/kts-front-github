import {Col, Row} from 'antd';
import {CreateRepo, RepoPanel} from 'components';
import {repoMockItems} from 'constants/mockItemsData';

import React, {FC, useEffect, useState} from 'react';
import GitHubStore from 'store/GitHubStore';
import {GetUserReposListParams} from 'store/GitHubStore/types';
import styled from 'styled-components';

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
    <Root>
      <Row>
        <Col>
          <RepoPanel items={items} />
        </Col>
        <Col>
          <CreateRepo />
        </Col>
      </Row>
    </Root>
  );
};

const Root = styled.main`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export default App;
