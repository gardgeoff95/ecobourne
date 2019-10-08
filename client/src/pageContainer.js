import React, { Component } from "react";
import firebase from "firebase";
import io from "socket.io-client";
import TitleScreen from "./pages/titleScreen/titleScreen";
import InGame from "./pages/inGame/inGame";
import LocalScoreScreen from "./pages/localScoreScreen/localScoreScreen";
import LobbySelection from "./pages/lobbySelection/lobbySelection";
import GlobalScoreScreen from "./pages/globalScoreScreen/globalScoreScreen";

//Declaring the Firebase config used for transporting data back and forth from electron
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

// database.ref("foxes").on("value", function(snap) {
//   console.log(snap.val().deaths.starvation);
// });

// database.ref("bears").on("value", function(snap) {
//   console.log(snap.val().deaths.starvation);
// });

//Class that will route for the client side
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
        preditor: 0,
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
    this.socket = io("http://localhost:3000");
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
      if (snap != null) {
        let bunnyObj = {
          starvation: snap.val().deaths.starvation,
          oldAge: snap.val().deaths.oldAge
        };
        this.setState({
          bunnyStats: bunnyObj
        });
      }
    });
    this.database.ref("foxes").on("value", snap => {
      if (snap != null) {
        let foxObj = {
          starvation: snap.val().deaths.starvation,
          predator: snap.val().deaths.predator,
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

  //This function adds players to the game
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
  //These are just place holder functions for now
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
  goToGame = event => {
    event.preventDefault();
    this.setState({
      page: "InGame"
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
    console.log(this.state.chatLog);
    if (this.state.page === "TitleScreen") {
      return <TitleScreen addPlayer={this.addPlayer} />;
    } else if (this.state.page === "LobbySelection") {
      return (
        <LobbySelection
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToGame={this.goToGame}
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
          goToLocalScore={this.goToLocalScore}
          bunnyStats={this.state.bunnyStats}
          bearStats={this.state.bearStats}
          foxStats={this.state.foxStats}
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
    } else {
      return <TitleScreen />;
    }
  };

  render() {
    return (
      //This will be shifted into a chosing page function
      <div>{this.renderPage()}</div>
    );
  }
}

export default PageContainer;
