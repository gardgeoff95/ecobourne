import React, { Component } from "react";
import GameStats from "./../../components/gameStats/gameStats";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import '../inGame/inGame.css'

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
          <GameStats
            playerNames={this.props.playerNames}
            lobbyMembers={this.props.lobbyMembers}
          />
        </Row>
        <Row className="inGameStats">
          {/* Reactive in game stats will be here, with D3 */}
          <Col className="animalsLeft">
            <svg></svg>
          </Col>
          <Col className="timeSpent">
            <svg></svg>
          </Col>
          <Row>
            <Col className="scoreScreenBtn">
              <input
                type="submit"
                value="Go to Local Score"
                onClick={this.props.goToLocalScore}
              />
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default InGame;
