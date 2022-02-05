import {ApiResponse} from './../../shared/store/ApiStore/types';
import {HTTPMethod} from 'shared/store/ApiStore/types';
import ApiStore from '../../shared/store/ApiStore';
import {
  CreateUserRepoParams,
  GetOrganizationReposListParams,
  GetUserReposListParams,
  IGitHubStore,
} from './types';
import qs from 'qs';
import {IOrganizationRepoItem, IUserRepoItem} from 'types';

const BASE_URL = 'https://api.github.com';

const GITHUB_ACCESS_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN || '';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(BASE_URL);
  getUserReposRequestParams(params: GetUserReposListParams) {
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

  createUserRepoRequestParams(params: CreateUserRepoParams) {
    return {
      method: HTTPMethod.POST,
      endpoint: `user/repos`,
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
      },

      data: {
        name: params.name,
        description: params.description,
        private: params.private,
      },
    };
  }

  getOrgReposRequestParams(params: GetOrganizationReposListParams) {
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
    const requestParams = this.getUserReposRequestParams(params);
    return await this.apiStore.request(requestParams);
  }

  async createUserRepo(
    params: CreateUserRepoParams
  ): Promise<ApiResponse<IUserRepoItem>> {
    const requestParams = this.createUserRepoRequestParams(params);
    return await this.apiStore.request(requestParams);
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>> {
    const requestParams = this.getOrgReposRequestParams(params);
    return await this.apiStore.request(requestParams);
  }
}
