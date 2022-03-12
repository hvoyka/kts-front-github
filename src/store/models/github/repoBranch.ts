export interface RepoBranchApi {
  name: string;
}

export interface RepoBranchModel {
  name: string;
}

export const normalizeRepoBranch = (from: RepoBranchApi): RepoBranchModel => ({
  name: from.name,
});
