import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";

class InGame extends Component {
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
          <div className="inGameStats">
            {/* Reactive in game stats will be here, with D3 */}
          </div>
        </div>
      </div>
    );
  }
}

export default InGame;
