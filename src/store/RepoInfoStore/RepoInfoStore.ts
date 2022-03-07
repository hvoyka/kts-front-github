import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { HTTPMethod } from "shared/store/ApiStore";
import RootStore from "shared/store/RootStore";
import {
  normalizeRepoInfo,
  RepoInfoApi,
  RepoInfoModel,
} from "store/models/github/repoInfo";
import { Meta } from "utils";
import { ILocalStore } from "utils/userLocalStore";

import { GetRepoInfoParams, IRepoInfoStore } from "./types";

type PrivateFields = "_info" | "_meta";

export default class RepoInfoStore implements IRepoInfoStore, ILocalStore {
  private readonly _apiStore = RootStore.api;
  private _info: RepoInfoModel | undefined = undefined;
  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<RepoInfoStore, PrivateFields>(this, {
      _info: observable,
      _meta: observable,
      meta: computed,
      info: computed,
      getRepoInfo: action,
      destroy: action,
    });
  }

  get info(): RepoInfoModel | undefined {
    return this._info;
  }

  get meta(): Meta {
    return this._meta;
  }

  private getRepoInfoRequestParams(params: GetRepoInfoParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `repos/${params.owner}/${params.repo}`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: "",
    };
  }

  async getRepoInfo(params: GetRepoInfoParams): Promise<void> {
    this._info = undefined;
    const requestParams = this.getRepoInfoRequestParams(params);
    const response = await this._apiStore.request<RepoInfoApi>(requestParams);

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.SUCCESS;
        this._info = normalizeRepoInfo(response.data);
      } else {
        this._meta = Meta.ERROR;
      }
    });
  }

  destroy(): void {
    this._info = undefined;
    this._meta = Meta.INITIAL;
  }
}
