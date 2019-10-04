import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";

class GlobalScoreScreen extends Component {
  //Different values will go here for what needs to be displayed during the game... I think
  state = {
    name: "",
    value: ""
  };

  render() {
    return (
      <div className="container-fluid">
        <GameStats
          playerNames={this.props.playerNames}
          lobbyMembers={this.props.lobbyMembers}
        />
        <div className="gameScreen">
          <div className="gameTitle">
            <p>EcoBourne</p>
          </div>
          <div className="globalScores">
            <p>Global Stats:</p>
          </div>
          <div className="inGameStats">
            {/* Reactive in game stats will be here, with D3 */}
            <div className="animalsLeft">
              <svg></svg>
            </div>
            <div className="timeSpent">
              <svg></svg>
            </div>
            <input
              type="submit"
              value="Go to Local Score"
              onClick={this.props.goToLocalScore}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalScoreScreen;
