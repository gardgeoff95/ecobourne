import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={PageContainer} />
    </BrowserRouter>
  );
}

export default App;
