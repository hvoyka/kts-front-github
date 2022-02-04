import {RepoItem} from 'types';
type ReposTypes = 'all' | 'owner' | 'member';

type ReposSort = 'created' | 'updated' | ' pushed' | ' full_name';

export interface GetUserReposListParams {
  accept: string;
  username: string;
  type?: ReposTypes;
  sort?: ReposSort;
  direction?: 'asc ' | 'desc';
  per_page?: number;
  page?: number;
}

export type ApiResp<Items> = {
  data: Items;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetUserReposListParams
  ): Promise<ApiResp<RepoItem[]>>;
}
