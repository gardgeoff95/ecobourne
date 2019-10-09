import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

import mobiscroll from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

// import "./mobiscroll/css/mobiscroll.animation.css";

import BurgerMenu from './components/burgerMenu/burgerMenu';
import Login from './pages/login/login';


function App() {
  return (
    <BrowserRouter>
      <BurgerMenu />
      <Route exact path="/" component={PageContainer} />
    </BrowserRouter>
  );
}

export default App;