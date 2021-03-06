import React, { FC } from "react";

import { Skeleton } from "antd";
import { Avatar } from "components";
import { StarIcon } from "components/icons";
import dayjs from "dayjs";
import { RepoItemModel } from "store/models/github";
import styled from "styled-components";

type RepoTileProps = {
  item: RepoItemModel;
  isLoading?: boolean;
  onClick: (name: string) => void;
};

export const RepoTile: FC<RepoTileProps> = ({ item, isLoading, onClick }) => {
  const { name, owner, htmlUrl, stargazersCount, updatedAt } = item || {};

  const updateDate = dayjs(updatedAt).format("D MMM");
  const repoNameFirstLetter = name[0]?.toUpperCase();

  const handleClickOnCard = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (name && event.target instanceof HTMLDivElement) {
      onClick(name);
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
            style={{ width: "80px", height: "80px", marginRight: "15px" }}
            active
            size="default"
            shape="circle"
          />
          <Skeleton active title={false} paragraph={{ rows: 2 }} />
        </>
      ) : (
        <>
          <Avatar
            src={owner.avatarUrl}
            alt="avatar"
            letter={repoNameFirstLetter}
          />

          <Content>
            <Name>{name}</Name>
            <Link href={htmlUrl}>{owner?.login}</Link>

            <div>
              <StarIconWrapper>
                <StyledStarIcon />
              </StarIconWrapper>
              <StarCount>{stargazersCount}</StarCount>
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
