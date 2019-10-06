import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";
import AnimalStats from "./../../components/animalStats/animalStats";

class InGame extends Component {
  //Different values will go here for what needs to be displayed during the game... I think
  state = {
    name: "",
    value: ""
  };

  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        <GameStats
          playerNames={this.props.playerNames}
          lobbyMembers={this.props.lobbyMembers}
        />
        <AnimalStats />
      </div>
    );
  }
}

export default InGame;
