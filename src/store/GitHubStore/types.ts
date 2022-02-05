import {ApiResponse} from 'shared/store/ApiStore/types';
import {IOrganizationRepoItem, IUserRepoItem} from 'types';

type ReposTypes = 'all' | 'owner' | 'member';
type ReposSort = 'created' | 'updated' | ' pushed' | ' full_name';
type ReposDirection = 'asc ' | 'desc';

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
export interface GetOrganizationReposListParams {
  org: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: ReposDirection;
  per_page?: number;
  page?: number;
}

export interface IGitHubStore {
  getUserReposList(
    params: GetUserReposListParams
  ): Promise<ApiResponse<IUserRepoItem[]>>;

  createUserRepo(
    params: CreateUserRepoParams
  ): Promise<ApiResponse<IUserRepoItem>>;

  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>>;
}
