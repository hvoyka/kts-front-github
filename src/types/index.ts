export interface IUserRepoItem {
  id: number;
  name: string;
  url: string;
  stargazers_count: number;
  updated_at: string;
  avatar_url: string | null;
  owner: {
    login: string;
  };
}

export interface IOrganizationRepoItem {
  id: number;
  name: string;
  url: string;
  stargazers_count: number;
  updated_at: string;

  owner: {
    login: string;
    avatar_url: string | null;
  };
}
