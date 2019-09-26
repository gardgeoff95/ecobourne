import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";

class TitleScreen extends Component {
  state = {
    name: "",
    value: ""
  };
  addPlayer = () => {};

  handleSubmit(event) {
    event.preventDefault();
    this.setState = {};
  }

  render() {
    return (
      <div className="container-fluid">
        <GameStats
          playerNames={this.props.playerNames}
          lobbyMembers={this.props.lobbyMembers}
        />
        <div className="titleSection">
          <p>EcoBourne</p>
        </div>
        <div className="userInput">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default TitleScreen;
