export const ROUTES = {
  ROOT: "/",
  USER_REPOS: "/user-repos",
  USER_REPO: (name?: string) => `/user-repos/${name}`,
  ORG_REPOS: "/org-repos",
  ORG_REPO: (name?: string) => `/org-repos/${name}`,
  CREATE_USER_REPO: "/create-user-repo",
};
