export interface IRepoTile {
  id: number;
  repoName: string;
  userName: string;
  link: string;
  imageSrc: string | null;
  starsCount: number;
  updatedAt: string;
}
