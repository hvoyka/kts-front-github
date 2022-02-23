import React, { FC, useEffect, useState } from "react";

import { Col, Row } from "antd";
import { useReposContext } from "context";
import { MainLayout } from "layouts";
import InfiniteScroll from "react-infinite-scroll-component";
import { IUserRepoItem } from "types";

import { RepoPanel } from "./components";

export const Repos: FC = () => {
  const PER_PAGE = 6;
  const { items, isLoading, loadRepos } = useReposContext();
  const [loadedItems, setLoadedItems] = useState<IUserRepoItem[]>(items);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadRepos({
      per_page: PER_PAGE,
      page: currentPage,
    });
  }, []);

  useEffect(() => {
    setLoadedItems((prevItems) => prevItems.concat(items));
  }, [items]);

  const fetchMoreData = () => {
    loadRepos({
      per_page: PER_PAGE,
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
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <RepoPanel items={loadedItems} isLoading={false} />
          </InfiniteScroll>
        </Col>
      </Row>
    </MainLayout>
  );
};
