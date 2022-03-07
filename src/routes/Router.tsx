import React from "react";

import { CreateUserRepo, OrgRepos, UserRepos } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./ROUTES";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.USER_REPOS} element={<UserRepos />}>
        <Route path=":repoName" element={<UserRepos />} />
      </Route>
      <Route path={ROUTES.ORG_REPOS} element={<OrgRepos />}>
        <Route path=":repoName" element={<OrgRepos />} />
      </Route>
      <Route path={ROUTES.CREATE_USER_REPO} element={<CreateUserRepo />} />
      <Route path="*" element={<Navigate to={ROUTES.USER_REPOS} />} />
    </Routes>
  );
};
