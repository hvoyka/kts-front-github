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
  normalizeRepoBranch,
  RepoBranchApi,
  RepoBranchModel,
} from "store/models/github";
import { Meta } from "utils";
import { ILocalStore } from "utils/userLocalStore";

import { GetRepoBranchesParams, IRepoBranchesStore } from "./types";

type PrivateFields = "_branches" | "_meta";

export default class RepoBranchesStore
  implements IRepoBranchesStore, ILocalStore
{
  private readonly _apiStore = RootStore.api;
  private _branches: RepoBranchModel[] = [];

  private _meta: Meta = Meta.INITIAL;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,
      branches: computed,
      meta: computed,
      getRepoBranches: action,
      destroy: action,
    });
  }

  get branches(): RepoBranchModel[] {
    return this._branches;
  }

  get meta(): Meta {
    return this._meta;
  }

  private getRepoBranchesRequestParams(params: GetRepoBranchesParams) {
    return {
      method: HTTPMethod.GET,
      endpoint: `repos/${params.owner}/${params.repo}/branches`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: {},
    };
  }

  async getRepoBranches(params: GetRepoBranchesParams): Promise<void> {
    this._meta = Meta.LOADING;
    this._branches = [];

    const requestParams = this.getRepoBranchesRequestParams(params);
    const response = await this._apiStore.request<RepoBranchApi[]>(
      requestParams
    );

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.SUCCESS;
        this._branches = response.data.map((branch) =>
          normalizeRepoBranch(branch)
        );
      } else {
        this._meta = Meta.ERROR;
      }
    });
  }

  destroy(): void {
    this._branches = [];
    this._meta = Meta.INITIAL;
  }
}
