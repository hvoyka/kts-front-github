import React, { FC, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { useReposContext } from "context";
import { MainLayout } from "layouts";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { IUserRepoItem } from "types";

import { RepoPanel } from "./components";

export const Repos: FC = () => {
  const { items, isFirstLoad, loadRepos } = useReposContext();
  const [loadedItems, setLoadedItems] = useState<IUserRepoItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const onSearchSubmit = (searchValue: string) => {};

  useEffect(() => {
    loadRepos({
      page: currentPage,
    });
  }, []);

  useEffect(() => {
    if (items.length) {
      setHasMore(true);
      setLoadedItems((prevItems) => prevItems.concat(items));
    } else {
      setHasMore(false);
    }
  }, [items]);

  const fetchMoreData = () => {
    loadRepos({
      page: currentPage + 1,
    });
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <MainLayout>
      <Row>
        <Col>
          <InfiniteScroll
            dataLength={loadedItems?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader>Loading...</Loader>}
            endMessage={<EndMessage>Yay! You have seen it all</EndMessage>}
          >
            <RepoPanel
              items={loadedItems}
              isLoading={isFirstLoad}
              onSearchSubmit={onSearchSubmit}
            />
          </InfiniteScroll>
        </Col>
      </Row>
    </MainLayout>
  );
};

const Loader = styled.p`
  margin: 20px;
  font-size: 20px;
  text-align: center;
`;

const EndMessage = styled.p`
  text-align: center;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
`;
