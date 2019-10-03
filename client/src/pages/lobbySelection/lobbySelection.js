import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";

class TitleScreen extends Component {
  state = {};

  handleSubmit = event => {
    event.preventDefault();
    this.props.addPlayer(this.state.value);
  };
  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    console.log("My type of props: ", this.props);
    return (
      <div className="container-fluid">
        <div className="titleSection">
          <p>EcoBourne</p>
          <GameStats
            playerNames={this.props.playerNames}
            lobbyMembers={this.props.lobbyMembers}
          />
        </div>
        <form>
          <input
            type="submit"
            value="Go to game"
            onClick={this.props.goToGame}
          />
        </form>
      </div>
    );
  }
}

export default TitleScreen;