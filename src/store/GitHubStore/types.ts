import { ApiResponse } from "shared/store/ApiStore/types";
import { UserRepoItemApi } from "store/models/github";
import { ReposDirection, ReposSort, ReposTypes } from "store/types";
import { IOrganizationRepoItem, IUserRepoBranch } from "types";

export interface CreateUserRepoParams {
  name: string;
  private?: boolean;
  description?: string;
}

export interface GetRepoBranchesParams {
  owner: string;
  repo: string;
  per_page?: number;
  page?: number;
}
export interface GetOrganizationReposListParams {
  org: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: ReposDirection;
  per_page?: number;
  page?: number;
}

export interface IGitHubStore {
  createUserRepo(
    params: CreateUserRepoParams
  ): Promise<ApiResponse<UserRepoItemApi>>;

  getRepoBranches(
    params: GetRepoBranchesParams
  ): Promise<ApiResponse<IUserRepoBranch[]>>;

  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>>;
}
