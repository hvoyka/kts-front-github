import {Col, Row} from 'antd';
import {CreateRepo, RepoPanel} from 'components';

import React, {FC, useEffect, useState} from 'react';
import GitHubStore from 'store/GitHubStore';
import {GetUserReposListParams} from 'store/GitHubStore/types';
import styled from 'styled-components';
import {IUserRepoItem} from 'types';

const gitHubStore = new GitHubStore();

const App: FC = () => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const userParams: GetUserReposListParams = {
    username: 'hvoyka',
    direction: 'desc',
  };

  useEffect(() => {
    setIsRequestLoading(true);
    gitHubStore
      .getUserReposList(userParams)
      .then((response) => {
        if (response.success) setItems(response.data);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  }, []);

  return (
    <Root>
      <Row>
        <Col>
          <RepoPanel items={items} isLoading={isRequestLoading} />
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
