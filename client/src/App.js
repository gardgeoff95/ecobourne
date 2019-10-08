import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

<<<<<<< HEAD
// import mobiscroll from "@mobiscroll/react";
import "./mobiscroll/css/mobiscroll.animation.css";

import BurgerMenu from './components/burgerMenu/burgerMenu';
// import Sidebar from './components/Sidebar/sidebar';

function App() {
  return (
    <BrowserRouter>
      <BurgerMenu />
      {/* <Sidebar /> */}
=======
function App() {
  return (
    <BrowserRouter>
>>>>>>> origin/develop
      <Route exact path="/" component={PageContainer} />
    </BrowserRouter>
  );
}

export default App;