import React, { Component } from "react";
import TitleScreen from "./pages/titleScreen/titleScreen.js";

class App extends Component {
  state = {
    lobbyMembers: 0,
    playerNames: []
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <TitleScreen
          lobbyMembers={this.state.lobbyMembers}
          playerNames={this.state.playerNames}
        />
      </div>
    );
  }
}

export default App;
