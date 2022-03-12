import { GITHUB_ACCESS_TOKEN } from "constant";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import qs from "qs";
import { HTTPMethod } from "shared/store/ApiStore";
import RootStore from "shared/store/RootStore";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "store/models/github";
import {
  CollectionModel,
  getInitialCollectionModal,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared";
import { Meta } from "utils";
import { ILocalStore } from "utils/userLocalStore";

import { CreateUserRepoParams, GetUserReposListParams } from "./types";

type PrivateFields = "_list" | "_meta";

export default class UserReposStore implements UserReposStore, ILocalStore {
  private readonly _apiStore = RootStore.api;
  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModal();
  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<UserReposStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getUserReposList: action,
      createUserRepo: action,
      destroy: action,
    });
  }

  get list(): RepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  private getUserReposRequestParams(params: GetUserReposListParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `users/${params.username}/repos`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: qs.stringify({ ...params }),
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

      data: { ...params },
    };
  }

  async getUserReposList(params: GetUserReposListParams): Promise<void> {
    if (this._meta === Meta.LOADING) return;

    this._meta = Meta.LOADING;
    this._list = getInitialCollectionModal();

    const requestParams = this.getUserReposRequestParams(params);
    const response = await this._apiStore.request<RepoItemApi[]>(requestParams);

    runInAction(() => {
      if (response.success) {
        try {
          const list: RepoItemModel[] = [];

          response.data.forEach((item) => list.push(normalizeRepoItem(item)));

          this._list = normalizeCollection(list, (listItem) => listItem.id);

          this._meta = Meta.SUCCESS;
        } catch (error) {
          this._meta = Meta.ERROR;
          this._list = getInitialCollectionModal();
        }
      } else {
        this._meta = Meta.ERROR;
      }
    });
  }

  async createUserRepo(params: CreateUserRepoParams): Promise<void> {
    if (this._meta === Meta.LOADING) return;

    const requestParams = this.createUserRepoRequestParams(params);
    const response = await this._apiStore.request<RepoItemApi>(requestParams);

    runInAction(() => {
      if (response.success) {
        try {
          this._list.order.push(response.data.id);
          this._list.entities[response.data.id] = normalizeRepoItem(
            response.data
          );
          this._meta = Meta.SUCCESS;
        } catch (error) {
          this._meta = Meta.ERROR;
        }
      } else {
        this._meta = Meta.ERROR;
      }
    });
  }

  destroy(): void {
    this._list = getInitialCollectionModal();
    this._meta = Meta.INITIAL;
  }
}
