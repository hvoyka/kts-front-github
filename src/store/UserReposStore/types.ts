import { ReposDirection, ReposSort, ReposTypes } from "store/types";

export interface GetUserReposListParams {
  username: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: ReposDirection;
  per_page?: number;
  page?: number;
}

export interface UserReposStore {
  getUserReposList(params: GetUserReposListParams): Promise<void>;
}
