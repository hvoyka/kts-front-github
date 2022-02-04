export interface RepoItem {
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
