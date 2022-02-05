import {ApiResponse} from 'shared/store/ApiStore/types';
import {RepoItem} from 'types';
type ReposTypes = 'all' | 'owner' | 'member';

type ReposSort = 'created' | 'updated' | ' pushed' | ' full_name';

export interface GetUserReposListParams {
  username: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: 'asc ' | 'desc';
  per_page?: number;
  page?: number;
}

export interface IGitHubStore {
  getUserReposList(
    params: GetUserReposListParams
  ): Promise<ApiResponse<RepoItem[], any>>;
}
