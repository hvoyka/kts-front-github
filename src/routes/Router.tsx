import React from "react";

import { CreateRepo, Repos } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./ROUTES";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REPOS} element={<Repos />} />
      <Route path={ROUTES.CREATE_REPO} element={<CreateRepo />} />
      <Route path="*" element={<Navigate to={ROUTES.REPOS} />} />
    </Routes>
  );
};
