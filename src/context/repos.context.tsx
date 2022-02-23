import { createContext, FC, useContext, useState } from "react";

import { GetUserReposListParams, GitHubStore } from "store/GitHubStore";
import { IUserRepoItem } from "types";

import { IReposContext } from "./types";

const gitHubStore = GitHubStore.getInstance();

const initialContexValues: IReposContext = {
  items: [],
  isLoading: false,
  loadRepos: () => {},
};

const ReposContext = createContext(initialContexValues);

export const ReposProvider: FC = ({ children }) => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userParams: GetUserReposListParams = {
    username: "hvoyka",
    direction: "desc",
  };

  const loadRepos = (customParams?: Partial<GetUserReposListParams>) => {
    gitHubStore
      .getUserReposList({ ...userParams, ...customParams })
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
      {children}
    </ReposContext.Provider>
  );
};

export const useReposContext = () => useContext(ReposContext);
