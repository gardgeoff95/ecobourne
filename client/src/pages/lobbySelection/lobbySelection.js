import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";
import Chat from "../../components/chat/chat";

class LobbySelection extends Component {
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
    console.log(<Chat />);
    return (
      <div className="container-fluid">
        <div className="titleSection">
          <p>EcoBourne</p>
          <GameStats
            playerNames={this.props.playerNames}
            lobbyMembers={this.props.lobbyMembers}
            accountName={this.props.accountName}
          />
        </div>
        <button type="button" onClick={this.props.goToGame}>
          GoOOOOOOO
        </button>
        <Chat
          chatBtnClick={this.props.chatBtnClick}
          onMessageChange={this.props.onMessageChange}
          userMessage={this.props.userMessage}
          currentUser={this.props.currentUser}
          chatLog={this.props.chatLog}
        />
      </div>
    );
  }
}

export default LobbySelection;
