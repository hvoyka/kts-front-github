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
