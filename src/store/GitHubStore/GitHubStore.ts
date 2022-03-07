import qs from "qs";
import { ApiResponse, HTTPMethod } from "shared/store/ApiStore";
import RootStore from "shared/store/RootStore";
import { IOrganizationRepoItem } from "types";
import { ILocalStore } from "utils/userLocalStore";

import { GetOrganizationReposListParams, IGitHubStore } from "./types";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = RootStore.api;

  private getOrgReposRequestParams(params: GetOrganizationReposListParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `orgs/${params.org}/repos`,
      headers: {
        accept: "application/vnd.github.v3+json",
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
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>> {
    const requestParams = this.getOrgReposRequestParams(params);
    return await this._apiStore.request(requestParams);
  }

  destroy(): void {}
}
