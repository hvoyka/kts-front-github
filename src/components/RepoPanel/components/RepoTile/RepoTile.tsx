import {StarIcon} from 'components/icons';
import React, {FC} from 'react';
import './RepoTile.css';

export interface RepoTileProps {
  repoName: string;
  userName: string;
  link: string;
  imageSrc: string | null;
  starsCount: number;
  updatedAt: string;
}

export const RepoTile: FC<RepoTileProps> = ({
  repoName,
  userName,
  link,
  starsCount,
  imageSrc,
  updatedAt,
}) => {
  return (
    <div className="repo-tile">
      <div className="repo-tile__image-wrapper">
        {imageSrc ? (
          <img src={imageSrc} alt="Repository logo" />
        ) : (
          <div className="repo-tile__char">{repoName[0].toUpperCase()}</div>
        )}
      </div>
      <div className="repo-tile__content">
        <div className="repo-tile__name">{repoName}</div>
        <a href={link} className="repo-tile__link">
          {userName}
        </a>
        <div className="repo-tile__info">
          <span className="repo-tile__star-wrapper">
            <StarIcon />
          </span>
          <span className="repo-tile__star-count">{starsCount}</span>
          <span className="repo-tile__star-date">{updatedAt}</span>
        </div>
      </div>
    </div>
  );
};
