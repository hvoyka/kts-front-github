import { RepoOwnerApi, RepoOwnerModel, normalizeRepoOwner } from "./repoOwner";

export type RepoInfoApi = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  description: string;
  visibility: string;
  owner: RepoOwnerApi;
};

export type RepoInfoModel = {
  id: number;
  name: string;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: Date;
  description: string;
  visibility: string;
  owner: RepoOwnerModel;
};

export const normalizeRepoInfo = (from: RepoInfoApi): RepoInfoModel => ({
  id: from.id,
  name: from.name,
  htmlUrl: from.html_url,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
  description: from.description,
  visibility: from.visibility,
  owner: normalizeRepoOwner(from.owner),
});
