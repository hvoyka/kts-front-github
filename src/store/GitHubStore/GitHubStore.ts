import {ApiResponse} from './../../shared/store/ApiStore/types';
import {HTTPMethod} from 'shared/store/ApiStore/types';
import ApiStore from '../../shared/store/ApiStore';
import {GetUserReposListParams, IGitHubStore} from './types';
import qs from 'qs';
import {RepoItem} from 'types';

const BASE_URL = 'https://api.github.com';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(BASE_URL);
  getRequestParams(params: GetUserReposListParams) {
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

  async getOrganizationReposList(
    params: GetUserReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    const requestParams = this.getRequestParams(params);
    return await this.apiStore.request(requestParams);
  }
}
