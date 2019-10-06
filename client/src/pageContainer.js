import React, { Component } from "react";
import io from "socket.io-client";
import TitleScreen from "./pages/titleScreen/titleScreen";
import InGame from "./pages/inGame/inGame";
import LocalScoreScreen from "./pages/localScoreScreen/localScoreScreen";
import LobbySelection from "./pages/lobbySelection/lobbySelection";
import GlobalScoreScreen from "./pages/globalScoreScreen/globalScoreScreen";

class PageContainer extends Component {
  constructor() {
    super();
    this.state = {
      playerNames: [],
      lobbyMembers: 0,
      page: "TitleScreen",
      userMessage: "",
      finalMessage: "",
      currentUser: "",
      chatLog: [],
      bunnyStats: {
        pop: 0,
        starvation: 0,
        preditor: 0
      },
      foxStats: {
        pop: 0,
        starvation: 0
      },
      bearStats: {
        pop: 0,
        starvation: 0
      }
    };
    //THIS NEEDS HELP, andy required
    this.socket = io("http://localhost:3000");
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
    var message = this.state.userMessage;
    this.setState({
      finalMessage: message
    });
    console.log(this.state.currentUser, this.state.userMessage);
    event.preventDefault();
    let chatEntry = {
      user: this.state.currentUser,
      msg: this.state.userMessage
    };
    console.log(chatEntry);
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
