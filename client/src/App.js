import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

import Sidebar from './components/sidebar';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Route exact path="/" component={PageContainer} />
    </BrowserRouter>
  );
}

export default App;
