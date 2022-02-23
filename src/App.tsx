import React, { FC } from "react";

import { ReposProvider } from "context";
import { Router } from "routes/Router";

const App: FC = () => {
  return (
    <ReposProvider>
      <Router />
    </ReposProvider>
  );
};

export default App;
