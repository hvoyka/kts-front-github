import {ApiResponse} from './../../shared/store/ApiStore/types';
import {HTTPMethod} from 'shared/store/ApiStore/types';
import ApiStore from '../../shared/store/ApiStore';
import {
  GetOrganizationReposListParams,
  GetUserReposListParams,
  IGitHubStore,
} from './types';
import qs from 'qs';
import {IOrganizationRepoItem, IUserRepoItem} from 'types';

const BASE_URL = 'https://api.github.com';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(BASE_URL);
  getUserRequestParams(params: GetUserReposListParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `users/${params.username}/repos`,
      headers: {
        accept: 'application/vnd.github.v3+json',
      },
      data: qs.stringify({
        type: params.type,
        sort: params.sort,
        direction: params.direction,
        per_page: params.per_page,
        page: params.page,
      }),
    };
  }

  getOrgRequestParams(params: GetOrganizationReposListParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `orgs/${params.org}/repos`,
      headers: {
        accept: 'application/vnd.github.v3+json',
      },
      data: qs.stringify({
        type: params.type,
        sort: params.sort,
        direction: params.direction,
        per_page: params.per_page,
        page: params.page,
      }),
    };
  }

  async getUserReposList(
    params: GetUserReposListParams
  ): Promise<ApiResponse<IUserRepoItem[]>> {
    const requestParams = this.getUserRequestParams(params);
    return await this.apiStore.request(requestParams);
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>> {
    const requestParams = this.getOrgRequestParams(params);
    return await this.apiStore.request(requestParams);
  }
}
