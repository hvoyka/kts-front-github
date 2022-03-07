import { ApiResponse } from "shared/store/ApiStore/types";
import { ReposDirection, ReposSort, ReposTypes } from "store/types";
import { IOrganizationRepoItem } from "types";

export interface GetOrganizationReposListParams {
  org: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: ReposDirection;
  per_page?: number;
  page?: number;
}

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>>;
}
