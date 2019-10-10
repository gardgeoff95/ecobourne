import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";

import mobiscroll from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

// import "./mobiscroll/css/mobiscroll.animation.css";

// import BurgerMenu from './components/burgerMenu/burgerMenu';
import TitleScreen from "./pages/titleScreen/titleScreen.js";

// import Login from './pages/login/login';


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={PageContainer} />
      <Route exact path="/landing" component={TitleScreen} />
    </BrowserRouter>
  );
}

export default App;