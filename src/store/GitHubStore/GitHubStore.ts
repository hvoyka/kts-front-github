import {HTTPMethod} from 'shared/store/ApiStore/types';
import ApiStore from '../../shared/store/ApiStore';
import {ApiResp, GetUserReposListParams, IGitHubStore} from './types';
import qs from 'qs';
import {RepoItem} from 'types';

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(' https://api.github.com');

  async getOrganizationReposList(
    params: GetUserReposListParams
  ): Promise<ApiResp<RepoItem[]>> {
    try {
      const request: Promise<ApiResp<RepoItem[]>> = this.apiStore.request({
        method: HTTPMethod.GET,
        endpoint: `users/${params.username}/repos`,
        headers: {
          accept: params.accept,
        },
        data: qs.stringify({
          type: params.type,
          sort: params.sort,
          direction: params.direction,
          per_page: params.per_page,
          page: params.page,
        }),
      });

      return request.then((response) => response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
