import React from "react";

import styled from "styled-components";

type AvatarWithSrc = {
  src: string;
  alt: string;
};

type AvatarWithoutSrc = { src: null; letter: string; alt: string };

type AvatarProps = AvatarWithSrc | AvatarWithoutSrc;

export const Avatar = (props: AvatarProps) => {
  return (
    <>
      {props.src === null ? (
        <Root>
          <EmptyAvatar>{props.letter}</EmptyAvatar>
        </Root>
      ) : (
        <Root>
          <img src={props.src} alt={props.alt} />
        </Root>
      )}
    </>
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
