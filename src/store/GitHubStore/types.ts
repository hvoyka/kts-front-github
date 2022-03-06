import { ApiResponse } from "shared/store/ApiStore/types";
import { UserRepoItemApi } from "store/models/github";
import { ReposDirection, ReposSort, ReposTypes } from "store/types";
import { IOrganizationRepoItem } from "types";

export interface CreateUserRepoParams {
  name: string;
  private?: boolean;
  description?: string;
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

  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>>;
}
