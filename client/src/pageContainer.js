import React, { Component } from "react";
import TitleScreen from "./pages/titleScreen/titleScreen";
import InGame from "./pages/inGame/inGame";
import LocalScoreScreen from "./pages/localScoreScreen/localScoreScreen";
import LobbySelection from "./pages/lobbySelection/lobbySelection";
import GlobalScoreScreen from "./pages/globalScoreScreen/globalScoreScreen";
import Login from './pages/login/login';
import Signup from './components/signup/signup';
import BurgerMenu from "./components/burgerMenu/burgerMenu";

import io from "socket.io-client"
import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyAaktd7xWg2F92a5py9ZBB5fdsySImFOGQ",
  authDomain: "ecobourne-fb892.firebaseapp.com",
  databaseURL: "https://ecobourne-fb892.firebaseio.com",
  projectId: "ecobourne-fb892",
  storageBucket: "",
  messagingSenderId: "342132988603",
  appId: "1:342132988603:web:59feab64b679748217279e"
};
firebase.initializeApp(firebaseConfig);
class PageContainer extends Component {
  constructor() {
    super();
    this.state = {
      playerNames: [],
      lobbyMembers: 0,
      page: "TitleScreen",
      userMessage: "",
      currentUser: "",
      chatLog: [],
      bunnyStats: {
        pop: 0,
        starvation: 0,
        predator: 0,
        oldAge: 0
      },
      foxStats: {
        pop: 0,
        starvation: 0,
        oldAge: 0
      },
      bearStats: {
        pop: 0,
        starvation: 0,
        oldAge: 0
      }
    };
    //THIS NEEDS HELP, andy required
    this.socket = io("window.location.hostname");
    this.database = firebase.database();
  }
  componentDidMount() {
    this.socket.on("user listener", users => {
      console.log("NOW LISTENING");
      this.setState({ playerNames: users });
    });
    this.socket.on("chat message", data => {
      console.log(data);
      let newLog = this.state.chatLog;
      newLog.push(data);
      console.log(newLog);
      this.setState({
        chatLog: newLog
      });
    });
    this.database.ref("rabbits").on("value", snap => {
      if (snap.val() != null) {
        let bunnyObj = {
          starvation: snap.val().deaths.starvation,
          predator: snap.val().deaths.predator,
          oldAge: snap.val().deaths.oldAge
        };
        this.setState({
          bunnyStats: bunnyObj
        });
      }
    });
    this.database.ref("foxes").on("value", snap => {
      if (snap.val() != null) {
        let foxObj = {
          starvation: snap.val().deaths.starvation,
          oldAge: snap.val().deaths.oldAge
        };
        this.setState({
          foxStats: foxObj
        });
      }
    });
  }

  //This function will handle the page being changed and passing that to the state
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  goToGame = event => {
    console.log("goToGame");
    event.preventDefault();
    this.setState({
      page: "TitleScreen"
    });
  };
  addPlayer = playerName => {
    let newPlayers = this.state.playerNames;
    newPlayers.push(playerName);
    this.setState({
      lobbyMembers: this.state.lobbyMembers + 1,
      playerNames: newPlayers,
      page: "LobbySelection"
    });
  };

  goToLocalScore = () => {
    this.setState({
      page: "LocalScoreScreen"
    });
  };
  goToGlobalScore = () => {
    this.setState({
      page: "GlobalScoreScreen"
    });
  };
  goToLogin = () => {
    this.setState({
      page: "login"
    });
  };
  goToSignup = () => {
    this.setState({
      page: "signup"
    });
  };
  goToTitleScreen = () => {
    this.setState({
      page: "TitleScreen"
    });
  };
  //This function will actually change the page
  renderPage = () => {
    console.log('CURRENT PAGE', this.state.page);
    if (this.state.page === "TitleScreen") {
      return <TitleScreen addPlayer={this.addPlayer} />;
    } else if (this.state.page === "LobbySelection") {
      return (
        <LobbySelection
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToGame={this.goToGame}
        />
      );
    } else if (this.state.page === "InGame") {
      return (
        <InGame
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToLocalScore={this.goToLocalScore}
        />
      );
    } else if (this.state.page === "LocalScoreScreen") {
      return (
        <LocalScoreScreen
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToGlobalScore={this.goToGlobalScore}
        />
      );
    } else if (this.state.page === "GlobalScoreScreen") {
      return (
        <GlobalScoreScreen
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToLocalScore={this.goToLocalScore}
        />
      );
    } else if (this.state.page === "signup") {
      console.log('OVER HERE')
      return (
        <Signup />
      )
    } else if (this.state.page === "login") {
      return (
        <Login />
      )
    } else {
      return <TitleScreen />;
    }
  };

  render() {
    return (
      //This will be shifted into a chosing page function
      <div>
        <BurgerMenu
          goToHome={this.goToTitleScreen}
          goToLogin={this.goToLogin}
          goToSignUp={this.goToSignup}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default PageContainer;
