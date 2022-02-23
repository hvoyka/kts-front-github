import { GetUserReposListParams } from "store/GitHubStore";
import { IUserRepoItem } from "types";

export interface IReposContext {
  items: IUserRepoItem[];
  isLoading: boolean;
  loadRepos: (customParams?: Partial<GetUserReposListParams>) => void;
}
