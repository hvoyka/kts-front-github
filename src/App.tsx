import React, { FC } from "react";

import { BrowserRouter } from "react-router-dom";
import { Router } from "routes/Router";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
