import { createContext } from "react";

import { IReposContext } from "./types";

export const ReposContext = createContext<IReposContext>({
  items: [],
  isLoading: false,
  loadRepos: () => {},
});
