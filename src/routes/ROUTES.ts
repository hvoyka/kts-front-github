export const ROUTES = {
  ROOT: "/",
  REPOS: "/repos",
  REPO: (name?: string) => `/repos/${name}`,
  CREATE_REPO: "/create-repo",
};
