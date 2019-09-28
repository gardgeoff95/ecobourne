import React, { Component } from "react";
import TitleScreen from "./pages/titleScreen/titleScreen";
import InGame from "./pages/inGame/inGame";
import ScoreScreen from "./pages/scoreScreen/scoreScreen";
import LobbySelection from "./pages/lobbySelection/lobbySelection";

class PageContainer extends Component {
  state = {
    lobbyMembers: 0,
    playerNames: [],
    page: "TitleScreen"
  };

  //This function will handle the page being changed and passing that to the state
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  //This function will actually change the page
  renderPage = () => {
    if (this.state.page === "TitleScreen") {
      return <TitleScreen addPlayer={this.addPlayer} />;
    } else if (this.state.page === "LobbySelection") {
      return (
        <LobbySelection
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
        />
      );
    } else if (this.state.page === "InGame") {
      return <InGame />;
    } else if (this.state.page === "ScoreScreen") {
      return <ScoreScreen />;
    } else {
      return <TitleScreen />;
    }
  };
  //Not 100% on how to do this lmao, ask Andy
  addPlayer = playerName => {
    let newPlayers = this.state.playerNames;
    newPlayers.push(playerName);
    this.setState({
      lobbyMembers: this.state.lobbyMembers + 1,
      playerNames: newPlayers,
      page: "LobbySelection"
    });
  };
  // this.props.history.push("/lobby");
  render() {
    return (
      //This will be shifted into a chosing page function
      <div>{this.renderPage()}</div>
    );
  }
}

export default PageContainer;
