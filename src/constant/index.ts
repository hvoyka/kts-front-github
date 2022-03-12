import { RepoItemModel } from "store/models/github";

export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
export const GITHUB_ACCESS_TOKEN =
  process.env.REACT_APP_GITHUB_ACCESS_TOKEN || "";

export const USER_EMPTY_REPO_MOCK: RepoItemModel = {
  name: "",
  stargazersCount: 0,

  htmlUrl: "",
  id: 0,
  owner: { id: 0, url: "", login: "", avatarUrl: null },
  updatedAt: new Date(),
};
