export interface IUserRepoItem {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  avatar_url: string | null;
  owner: {
    login: string;
  };
}

export interface IUserRepoBranch {
  name: string;
}

export interface IOrganizationRepoItem {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;

  owner: {
    login: string;
    avatar_url: string | null;
  };
}
