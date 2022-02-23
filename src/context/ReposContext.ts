import { createContext } from "react";

import { IReposContext } from "./types";

const initialContexValues: IReposContext = {
  items: [],
  isLoading: false,
  loadRepos: () => {},
};

export const ReposContext = createContext(initialContexValues);
