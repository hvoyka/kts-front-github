import React, { FC, useState } from "react";

import { ReposContext } from "context";
import { Router } from "routes/Router";
import { GetUserReposListParams, GitHubStore } from "store/GitHubStore";
import { IUserRepoItem } from "types";
const gitHubStore = new GitHubStore();

const App: FC = () => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userParams: GetUserReposListParams = {
    username: "hvoyka",
    direction: "desc",
  };

  const loadRepos = () => {
    setIsLoading(true);
    gitHubStore
      .getUserReposList(userParams)
      .then((response) => {
        if (response.success) setItems(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ReposContext.Provider
      value={{
        items,
        isLoading,
        loadRepos,
      }}
    >
      <Router />
    </ReposContext.Provider>
  );
};

export default App;
