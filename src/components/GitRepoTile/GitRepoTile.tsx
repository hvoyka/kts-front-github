import {StarIcon} from 'components/icons';
import React, {FC} from 'react';
import './GitRepoTile.css';

interface GitRepoTileProps {
  repoName: string;
  userName: string;
  link: string;
  imageSrc: string;
  starsCount: number;
  updatedAt: string;
}

export const GitRepoTile: FC<GitRepoTileProps> = ({
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
        <img src={imageSrc} alt="Repository logo" />
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
