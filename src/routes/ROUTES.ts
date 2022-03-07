export const ROUTES = {
  ROOT: "/",
  USER_REPOS: "/user-repos",
  USER_REPO: (user: string, name?: string) =>
    `/user-repos/${user}/${name ? name : ""}`,
  ORG_REPOS: "/org-repos",
  ORG_REPO: (org: string, name?: string) =>
    `/org-repos/${org}/${name ? name : ""}`,
  CREATE_USER_REPO: "/create-user-repo",
};
