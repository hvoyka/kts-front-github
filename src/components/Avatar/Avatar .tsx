import React, { FC } from "react";

import styled from "styled-components";

interface AvatarProps {
  imageSrc: string | null;
  alt: string;
  letter?: string;
}

export const Avatar: FC<AvatarProps> = ({ imageSrc, alt, letter }) => {
  return (
    <Root>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} />
      ) : (
        <EmptyAvatar>{letter}</EmptyAvatar>
      )}
    </Root>
  );
};

const Root = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
`;

const EmptyAvatar = styled.div`
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
