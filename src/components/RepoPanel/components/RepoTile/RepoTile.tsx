import {StarIcon} from 'components/icons';
import React, {FC} from 'react';
import {RepoItem} from 'types';
import './RepoTile.css';
import dayjs from 'dayjs';

type RepoTileProps = {
  item: RepoItem;
};

export const RepoTile: FC<RepoTileProps> = ({item}) => {
  const {avatar_url, name, owner, url, stargazers_count, updated_at} =
    item || {};
  const updateDate = dayjs(updated_at).format('D MMM');

  return (
    <div className="repo-tile">
      <div className="repo-tile__image-wrapper">
        {avatar_url ? (
          <img src={avatar_url} alt="Repository logo" />
        ) : (
          <div className="repo-tile__char">{owner?.login[0].toUpperCase()}</div>
        )}
      </div>
      <div className="repo-tile__content">
        <div className="repo-tile__name">{name}</div>
        <a href={url} className="repo-tile__link">
          {owner?.login}
        </a>
        <div className="repo-tile__info">
          <span className="repo-tile__star-wrapper">
            <StarIcon />
          </span>
          <span className="repo-tile__star-count">{stargazers_count}</span>
          <span className="repo-tile__star-date">Updated {updateDate}</span>
        </div>
      </div>
    </div>
  );
};
