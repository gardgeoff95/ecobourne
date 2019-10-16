import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "../inGame/inGame.css";
import AnimalStats from "../../components/animalStats/animalStats";

class InGame extends Component {
  //Different values will go here for what needs to be displayed during the game... I think
  state = {
    name: "",
    value: ""
  };

  render() {
    console.log(this.props);
    return (
      <Container fluid={true}>
        <Row>
          {/* <Col></Col>
          <Col id="chatBtnRow">
            <div id="chatBtnDiv">
              <button id="chatBtn" type="button" onClick={this.props.gotToLobby}>
                Stats
        </button>
            </div>
          </Col>
          <Col></Col> */}
          <AnimalStats
            bunnyStats={this.props.bunnyStats}
            foxStats={this.props.foxStats}
            bearStats={this.props.bearStats}
          />
          <GameStats
            playerNames={this.props.playerNames}
            lobbyMembers={this.props.lobbyMembers}
            accountName={this.props.accountName}
          />
        </Row>
        <button onClick={this.props.goToLobby}>Chat</button>
      </Container>
    );
  }
}

export default InGame;
