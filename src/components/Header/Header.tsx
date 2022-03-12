import React, { FC } from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/ROUTES";
import styled from "styled-components";
export const Header: FC = () => {
  return (
    <Root>
      <Menu mode="horizontal" selectable={false}>
        <Menu.Item key="org-repos">
          <Link to={ROUTES.ORG_REPOS}> Organization repos</Link>
        </Menu.Item>
        <Menu.Item key="user-repos">
          <Link to={ROUTES.USER_REPOS}> User repos</Link>
        </Menu.Item>

        <Menu.Item key="create-user-repo">
          <Link to={ROUTES.CREATE_USER_REPO}>Create user repo</Link>
        </Menu.Item>
      </Menu>
    </Root>
  );
};

const Root = styled.header`
  position: relative;
`;
