import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";
import Chat from "../../components/chat/chat";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './lobbySelection.css';

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
    // console.log(<Chat />);
    return (
      <Container>
        <div className="titleSection">
          <GameStats
            playerNames={this.props.playerNames}
            lobbyMembers={this.props.lobbyMembers}
            accountName={this.props.accountName}
          />
        </div>
        <div id="statsBtnDiv">
          <button id="statsBtn" type="button" onClick={this.props.goToGame}>
            Stats
        </button>
        </div>
        <Chat
          chatBtnClick={this.props.chatBtnClick}
          onMessageChange={this.props.onMessageChange}
          userMessage={this.props.userMessage}
          currentUser={this.props.currentUser}
          chatLog={this.props.chatLog}
        />
      </Container>
    );
  }
}

export default LobbySelection;
