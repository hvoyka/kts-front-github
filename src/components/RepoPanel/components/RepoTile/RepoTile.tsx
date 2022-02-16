import {StarIcon} from 'components/icons';
import React, {FC} from 'react';
import {IUserRepoItem} from 'types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {Skeleton} from 'antd';

type RepoTileProps = {
  item: IUserRepoItem;
  isLoading?: boolean;
  onClick?: () => void;
};

export const RepoTile: FC<RepoTileProps> = ({item, isLoading, onClick}) => {
  const {avatar_url, name, owner, html_url, stargazers_count, updated_at} =
    item || {};
  const updateDate = dayjs(updated_at).format('D MMM');

  const handleClickOnCard = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target instanceof HTMLDivElement) {
      onClick?.();
    }
  };

  return (
    <Root
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClickOnCard(event)
      }
    >
      {isLoading ? (
        <>
          <Skeleton.Avatar
            style={{width: '80px', height: '80px', marginRight: '15px'}}
            active
            size="default"
            shape="circle"
          />
          <Skeleton active title={false} paragraph={{rows: 2}} />
        </>
      ) : (
        <>
          <ImageWrapper>
            {avatar_url ? (
              <img src={avatar_url} alt="Repository logo" />
            ) : (
              <RepoEmptyAvatar>{owner?.login[0].toUpperCase()}</RepoEmptyAvatar>
            )}
          </ImageWrapper>

          <Content>
            <Name>{name}</Name>
            <Link href={html_url}>{owner?.login}</Link>

            <div>
              <StarIconWrapper>
                <StyledStarIcon />
              </StarIconWrapper>
              <StarCount>{stargazers_count}</StarCount>
              <Date>Updated {updateDate}</Date>
            </div>
          </Content>
        </>
      )}
    </Root>
  );
};

const Root = styled.div`
  background: var(--white);
  border-radius: 6px;
  transition: box-shadow 0.2s;
  border: 1px solid var(--gray1);
  padding: 11px;
  max-width: 357px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    box-shadow: 0px 2px 6px rgba(182, 182, 182, 0.25);
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
`;

const RepoEmptyAvatar = styled.div`
  background: var(--red1);
  color: var(--white);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
`;

const Content = styled.div`
  max-width: 241px;
  width: 100%;
`;

const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 4px;
  font-weight: bold;
`;

const Link = styled.a`
  display: block;
  width: min-content;
  margin-bottom: 4px;
  color: var(--gray2);
  transition: color 0.2s;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  line-height: 16px;

  &:hover {
    color: var(--blue1);
  }
`;

const StarIconWrapper = styled.span`
  margin-right: 4px;
  width: 14px;
  height: 14px;
  vertical-align: middle;
`;

const StyledStarIcon = styled(StarIcon)`
  display: inline-block;
`;

const StarCount = styled.span`
  vertical-align: middle;
  margin-right: 20px;
  color: var(--gray2);
  font-size: 14px;
  line-height: 16px;
`;

const Date = styled.span`
  vertical-align: middle;
  color: var(--gray2);
  font-size: 14px;
  line-height: 16px;
`;
