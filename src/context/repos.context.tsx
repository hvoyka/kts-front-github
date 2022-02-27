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

  const loadRepos = async (customParams?: Partial<GetUserReposListParams>) => {
    const response = await gitHubStore.getUserReposList(userParams);
    if (response.success) setItems(response.data);
    setIsLoading(false);
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
