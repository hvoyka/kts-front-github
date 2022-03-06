import { createContext, FC, useContext, useState } from "react";

import { GetUserReposListParams, GitHubStore } from "store/GitHubStore";
import { IUserRepoItem } from "types";

import { IReposContext } from "./types";

const gitHubStore = GitHubStore.getInstance();

const initialContexValues: IReposContext = {
  items: [],
  isFirstLoad: false,
  loadRepos: () => {},
};

const ReposContext = createContext(initialContexValues);

export const ReposProvider: FC = ({ children }) => {
  const [items, setItems] = useState<IUserRepoItem[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const userParams: GetUserReposListParams = {
    username: "hvoyka",
    direction: "desc",
    per_page: 6,
  };

  const loadRepos = async (customParams?: Partial<GetUserReposListParams>) => {
    const response = await gitHubStore.getUserReposList({
      ...userParams,
      ...customParams,
    });
    if (response.success) setItems(response.data);
    setIsFirstLoad(false);
  };

  return (
    <ReposContext.Provider
      value={{
        items,
        isFirstLoad: isFirstLoad,
        loadRepos,
      }}
    >
      {children}
    </ReposContext.Provider>
  );
};

export const useReposContext = () => useContext(ReposContext);
