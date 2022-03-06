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

import { GetUserReposListParams } from "./types";

type PrivateFields = "_userRepoList" | "_userRepoMeta";

export default class UserReposStore implements UserReposStore, ILocalStore {
  private readonly _apiStore = RootStore.api;
  private _userRepoList: CollectionModel<number, UserRepoItemModel> =
    getInitialCollectionModal();
  private _userRepoMeta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<UserReposStore, PrivateFields>(this, {
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

  destroy(): void {}
}
