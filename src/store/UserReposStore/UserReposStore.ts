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
import { Meta } from "utils";
import { ILocalStore } from "utils/userLocalStore";

import { CreateUserRepoParams, GetUserReposListParams } from "./types";

type PrivateFields = "_list" | "_meta";

export default class UserReposStore implements UserReposStore, ILocalStore {
  private readonly _apiStore = RootStore.api;
  private _list: CollectionModel<number, UserRepoItemModel> =
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

  get list(): UserRepoItemModel[] {
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

  async getUserReposList(params: GetUserReposListParams): Promise<void> {
    this._meta = Meta.LOADING;
    this._list = getInitialCollectionModal();

    const requestParams = this.getUserReposRequestParams(params);
    const response = await this._apiStore.request<UserRepoItemApi[]>(
      requestParams
    );

    runInAction(() => {
      if (response.success) {
        try {
          const list: UserRepoItemModel[] = [];

          for (const item of response.data) {
            list.push(normalizeUserRepoItem(item));
          }

          this._list = normalizeCollection(list, (listItem) => listItem.id);

          this._meta = Meta.SUCCESS;
        } catch (error) {
          console.error(error);
          this._meta = Meta.ERROR;
          this._list = getInitialCollectionModal();
        }
      } else {
        this._meta = Meta.ERROR;
      }
    });
  }

  async createUserRepo(params: CreateUserRepoParams): Promise<void> {
    const requestParams = this.createUserRepoRequestParams(params);
    const response = await this._apiStore.request<UserRepoItemApi>(
      requestParams
    );

    runInAction(() => {
      if (response.success) {
        try {
          const newItem = response.data;
          const id = newItem.id;

          this._list.order.push(id);
          this._list.entities[id] = normalizeUserRepoItem(newItem);
          this._meta = Meta.SUCCESS;
        } catch (error) {
          console.error(error);
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
