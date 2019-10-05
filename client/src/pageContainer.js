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
      currentUser: ""
    };
    //THIS NEEDS HELP
    this.socket = io("http://localhost:3000");
  }
  componentDidMount() {
    let lobby = this.state.playerNames.length;
    this.socket.on("user listener", users => {
      console.log("NOW LISTENING");
      this.setState({ playerNames: users });
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
    console.log(this.state.currentUser, this.state.userMessage);
    event.preventDefault();
    this.socket.emit("chat message", this.state.userMessage);
  };

  //This function will actually change the page
  renderPage = () => {
    console.log(this.state);
    if (this.state.page === "TitleScreen") {
      return <TitleScreen addPlayer={this.addPlayer} />;
    } else if (this.state.page === "LobbySelection") {
      return (
        <LobbySelection
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
          goToGame={this.goToGame}
          chatBtnClick={this.chatBtnClick}
          onMessageChange={this.onMessageChange}
          userMessage={this.state.userMessage}
          currentUser={this.state.currentUser}
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
