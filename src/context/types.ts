import { IUserRepoItem } from "types";

export interface IReposContext {
  items: IUserRepoItem[];
  isLoading: boolean;
  loadRepos: () => void;
}
