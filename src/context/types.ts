import { GetUserReposListParams } from "store/GitHubStore";
import { IUserRepoItem } from "types";

export interface IReposContext {
  items: IUserRepoItem[];
  isFirstLoad: boolean;
  loadRepos: (customParams?: Partial<GetUserReposListParams>) => void;
}
