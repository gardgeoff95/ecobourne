import React, { Component } from "react";
import TitleScreen from "./pages/titleScreen/titleScreen";
import InGame from "./pages/inGame/inGame";
import LobbySelection from "./pages/lobbySelection/lobbySelection";
import Login from "./pages/login/login";
import Signup from "./components/signup/signup";
import BurgerMenu from "./components/burgerMenu/burgerMenu";
import io from "socket.io-client";
import firebase from "firebase";
import { runInThisContext } from "vm";

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
      accountName: "",
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
    //window.location.hostname
    if (process.env.NODE_ENV === "production") {
      this.socket = io(window.location.hostname);
    } else {
      this.socket = io("http://localhost:3001");
    }
    this.database = firebase.database();
  }

  setAccountName = name => {
    this.setState({
      accountName: name
    });
  };

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
      page: "InGame"
    });
  };
  addPlayer = playerName => {
    let newPlayers = this.state.playerNames;
    newPlayers.push(playerName);
    let newLength = newPlayers.length;

    this.setState({
      lobbyMembers: newLength,
      playerNames: newPlayers,
      page: "LobbySelection",
      currentUser: playerName
    });
    this.socket.emit("user listener", playerName);
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
  goToHomeScreen = () => {
    this.setState({
      page: "TitleScreen"
    });
  };
  goToLobby = () => {
    this.setState({
      page: "LobbySelection"
    });
  };

  //Tracking the user message
  onMessageChange = event => {
    this.setState({
      userMessage: event.target.value
    });
  };
  //This will submit the message to the server and load it to the page
  chatBtnClick = event => {
    console.log(this.state);
    event.preventDefault();
    let chatEntry = {
      user: this.state.currentUser,
      msg: this.state.userMessage
    };
    this.setState({
      userMessage: ""
    });
    this.socket.emit("chat message", chatEntry);
  };

  //This function will actually change the page
  renderPage = () => {
    console.log("CURRENT PAGE", this.state.page);
    if (this.state.page === "TitleScreen") {
      return <TitleScreen addPlayer={this.addPlayer} />;
    } else if (this.state.page === "LobbySelection") {
      return (
        <LobbySelection
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToGame={this.goToGame}
          accountName={this.state.accountName}
          // The params bellow are what the chat requires
          chatBtnClick={this.chatBtnClick}
          onMessageChange={this.onMessageChange}
          chatLog={this.state.chatLog}
          userMessage={this.state.userMessage}
        />
      );
    } else if (this.state.page === "InGame") {
      return (
        <InGame
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          accountName={this.state.accountName}
          goToLocalScore={this.goToLocalScore}
          bunnyStats={this.state.bunnyStats}
          bearStats={this.state.bearStats}
          foxStats={this.state.foxStats}
          // The params bellow are what the chat requires
          chatBtnClick={this.chatBtnClick}
          onMessageChange={this.onMessageChange}
          chatLog={this.state.chatLog}
          userMessage={this.state.userMessage}
        />
      );
    } else if (this.state.page === "signup") {
      console.log("OVER HERE");
      return (
        <Signup
          goToSignIn={this.goToLogin}
          setAccountName={this.setAccountName}
          addPlayer={this.addPlayer}
        />
      );
    } else if (this.state.page === "login") {
      return (
        <Login
          goToLobby={this.goToLobby}
          setAccountName={this.setAccountName}
          addPlayer={this.addPlayer}
          accountName={this.state.accountName}
        />
      );
    } else {
      return <TitleScreen />;
    }
  };

  render() {
    console.log(this.state.currentUser);
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