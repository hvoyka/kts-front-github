import React from "react";

import { CreateUserRepo, OrgRepos, UserRepos } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./ROUTES";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.USER_REPOS} element={<UserRepos />}>
        <Route
          path={`${ROUTES.USER_REPOS}/:user/:repo`}
          element={<UserRepos />}
        />
        <Route path={`${ROUTES.USER_REPOS}/:user`} element={<UserRepos />} />
      </Route>
      <Route path={ROUTES.ORG_REPOS} element={<OrgRepos />}>
        <Route path={`${ROUTES.ORG_REPOS}/:org/:repo`} element={<OrgRepos />} />
        <Route path={`${ROUTES.ORG_REPOS}/:org`} element={<OrgRepos />} />
      </Route>
      <Route path={ROUTES.CREATE_USER_REPO} element={<CreateUserRepo />} />
      <Route path="*" element={<Navigate to={ROUTES.ORG_REPOS} />} />
    </Routes>
  );
};
