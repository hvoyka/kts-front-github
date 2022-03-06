import React, { FC } from "react";

import { ReposProvider } from "context";
import { BrowserRouter } from "react-router-dom";
import { Router } from "routes/Router";

const App: FC = () => {
  return (
    <BrowserRouter>
      <ReposProvider>
        <Router />
      </ReposProvider>
    </BrowserRouter>
  );
};

export default App;
