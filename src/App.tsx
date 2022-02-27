import React, { FC, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { RepoPanel } from "components";
import { GitHubStore, GetUserReposListParams } from "store/GitHubStore";
import styled from "styled-components";
import { IUserRepoItem } from "types";

const gitHubStore = new GitHubStore();
const userParams: GetUserReposListParams = {
  username: "hvoyka",
  direction: "desc",
};

const App: FC = () => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const handleSearchSubmit = (searchValue: string) => {};

  useEffect(() => {
    setIsRequestLoading(true);

    (async () => {
      const response = await gitHubStore.getUserReposList(userParams);
      if (response.success) setItems(response.data);
      setIsRequestLoading(false);
    })();
  }, []);

  return (
    <Root>
      <Row>
        <Col>
          <RepoPanel
            items={items}
            isLoading={isRequestLoading}
            onSearchSubmit={handleSearchSubmit}
          />
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
