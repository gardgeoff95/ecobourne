import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";

class LocalScoreScreen extends Component {
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
          <div className="localScores">
            <p>Local Stats:</p>
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
              value="Go to Global Score"
              onClick={this.props.goToGlobalScore}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LocalScoreScreen;
