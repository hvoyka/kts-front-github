export interface GetRepoInfoParams {
  owner: string;
  repo: string;
}

export interface IRepoInfoStore {
  getRepoInfo(params: GetRepoInfoParams): Promise<void>;
}
