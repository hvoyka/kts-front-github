import { GITHUB_ACCESS_TOKEN } from "constant";
import qs from "qs";
import { ApiResponse, HTTPMethod } from "shared/store/ApiStore";
import RootStore from "shared/store/RootStore";
import { IOrganizationRepoItem, IUserRepoBranch, IUserRepoItem } from "types";

import { ILocalStore } from "./../../utils/userLocalStore";
import {
  CreateUserRepoParams,
  GetOrganizationReposListParams,
  GetRepoBranchesParams,
  GetUserReposListParams,
  IGitHubStore,
} from "./types";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly apiStore = RootStore.api;

  private getUserReposRequestParams(params: GetUserReposListParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `users/${params.username}/repos`,
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

  private createUserRepoRequestParams(params: CreateUserRepoParams) {
    return {
      method: HTTPMethod.POST,
      endpoint: `user/repos`,
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
      },

      data: {
        name: params.name,
        description: params.description,
        private: params.private,
      },
    };
  }

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

  private getRepoBranchesRequestParams(params: GetRepoBranchesParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `repos/${params.owner}/${params.repo}/branches`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: qs.stringify({
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

  async getRepoBranches(
    params: GetRepoBranchesParams
  ): Promise<ApiResponse<IUserRepoBranch[]>> {
    const requestParams = this.getRepoBranchesRequestParams(params);
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

  destroy(): void {}
}
