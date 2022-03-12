import { ReposDirection, ReposSort, ReposTypes } from "store/types";

export interface GetUserReposListParams {
  username: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: ReposDirection;
  per_page?: number;
  page?: number;
}

export interface CreateUserRepoParams {
  name: string;
  private?: boolean;
  description?: string;
}

export interface UserReposStore {
  getUserReposList(params: GetUserReposListParams): Promise<void>;
  createUserRepo(params: CreateUserRepoParams): Promise<void>;
}
