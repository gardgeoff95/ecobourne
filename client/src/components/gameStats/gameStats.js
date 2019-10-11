import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "../gameStats/gameStats.css";

function GameStats(props) {
  console.log(props);
  return (
    <Container fluid={true} id="lobbyContainer">
      <Row>
        <Col className="currentLobbyMembers">
          <p>
            Current Lobby Members:{" "}
            {props.playerNames.map(player => player + " ")}
          </p>
        </Col>
        <Col className="lobbyMembers">
          <p>There are {props.playerNames.length} lobby members</p>
        </Col>
      </Row>
    </Container>
  );
}

export default GameStats;
