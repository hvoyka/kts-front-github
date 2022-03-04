export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
export const GITHUB_ACCESS_TOKEN =
  process.env.REACT_APP_GITHUB_ACCESS_TOKEN || "";

export const USER_EMPTY_REPO_MOCK = {
  name: "",
  stargazers_count: 0,

  html_url: "",
  id: 0,
  owner: { login: "", avatar_url: null },
  updated_at: "",
};
