import React from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import styled from "styled-components";
export const Header = () => {
  return (
    <Root>
      <Menu mode="horizontal" selectable={false}>
        <Menu.Item key="repos">
          <Link to={ROUTES.REPOS}>Repos</Link>
        </Menu.Item>

        <Menu.Item key="create">
          <Link to={ROUTES.CREATE_REPO}>Create repo</Link>
        </Menu.Item>
      </Menu>
    </Root>
  );
};

const Root = styled.header`
  position: relative;
`;
