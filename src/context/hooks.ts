import { useContext } from "react";

import { ReposContext } from "./ReposContext";

export const useReposContext = () => useContext(ReposContext);
