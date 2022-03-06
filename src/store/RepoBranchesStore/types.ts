export interface GetRepoBranchesParams {
  owner: string;
  repo: string;
  per_page?: number;
  page?: number;
}

export interface RepoBranchesStore {
  getRepoBranches(params: GetRepoBranchesParams): Promise<void>;
}
