import React, { FC } from "react";

import { Header } from "components";
import styled from "styled-components";

export const MainLayout: FC = ({ children }) => {
  return (
    <Root>
      <Header />
      {children}
    </Root>
  );
};

const Root = styled.main`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;
