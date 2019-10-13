import React from "react";
import PageContainer from "./pageContainer.js";
import { BrowserRouter, Route } from "react-router-dom";


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