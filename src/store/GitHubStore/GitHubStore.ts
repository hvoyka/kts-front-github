import { GITHUB_ACCESS_TOKEN } from "constant";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import qs from "qs";
import { ApiResponse, HTTPMethod } from "shared/store/ApiStore";
import RootStore from "shared/store/RootStore";
import {
  normalizeUserRepoItem,
  UserRepoItemApi,
  UserRepoItemModel,
} from "store/models/github";
import {
  CollectionModel,
  getInitialCollectionModal,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared";
import { IOrganizationRepoItem, IUserRepoBranch } from "types";
import { Meta } from "utils";
import { ILocalStore } from "utils/userLocalStore";

import {
  CreateUserRepoParams,
  GetOrganizationReposListParams,
  GetRepoBranchesParams,
  GetUserReposListParams,
  IGitHubStore,
} from "./types";

type PrivateFields = "_userRepoList" | "_userRepoMeta";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = RootStore.api;
  private _userRepoList: CollectionModel<number, UserRepoItemModel> =
    getInitialCollectionModal();
  private _userRepoMeta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _userRepoList: observable.ref,
      _userRepoMeta: observable,
      userRepoList: computed,
      userRepoMeta: computed,
      getUserReposList: action,
    });
  }

  get userRepoList(): UserRepoItemModel[] {
    return linearizeCollection(this._userRepoList);
  }

  get userRepoMeta(): Meta {
    return this._userRepoMeta;
  }

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

  async getUserReposList(params: GetUserReposListParams): Promise<void> {
    this._userRepoMeta = Meta.LOADING;
    this._userRepoList = getInitialCollectionModal();

    const requestParams = this.getUserReposRequestParams(params);
    const response = await this._apiStore.request<UserRepoItemApi[]>(
      requestParams
    );

    runInAction(() => {
      if (response.success) {
        try {
          const userRepoList: UserRepoItemModel[] = [];

          for (const item of response.data) {
            userRepoList.push(normalizeUserRepoItem(item));
          }

          this._userRepoList = normalizeCollection(
            userRepoList,
            (listItem) => listItem.id
          );

          this._userRepoMeta = Meta.SUCCESS;
        } catch (error) {
          console.error(error);
          this._userRepoMeta = Meta.ERROR;
          this._userRepoList = getInitialCollectionModal();
        }
      } else {
        this._userRepoMeta = Meta.ERROR;
      }
    });
  }

  async getRepoBranches(
    params: GetRepoBranchesParams
  ): Promise<ApiResponse<IUserRepoBranch[]>> {
    const requestParams = this.getRepoBranchesRequestParams(params);
    return await this._apiStore.request(requestParams);
  }

  async createUserRepo(
    params: CreateUserRepoParams
  ): Promise<ApiResponse<UserRepoItemApi>> {
    const requestParams = this.createUserRepoRequestParams(params);
    return await this._apiStore.request(requestParams);
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<IOrganizationRepoItem[]>> {
    const requestParams = this.getOrgReposRequestParams(params);
    return await this._apiStore.request(requestParams);
  }

  destroy(): void {}
}
