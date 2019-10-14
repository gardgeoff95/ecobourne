import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "../gameStats/gameStats.css";

function GameStats(props) {
  console.log(props);
  return (
    <Container fluid={true}>
      <div className="lobbyCount">
        <p>Total players: {props.playerNames.length}</p>
      </div>
      {/* <Row id="lobbyContainer"> */}
      {/* <p>Current Account: {this.props.accountName}</p> */}
      {/* <Col className="lobbyMembers">
          <p>
            Current Lobby Members:{" "}
            {props.playerNames.map(player => player + " ")}
          </p>
        </Col> */}
      {/* <Col className="lobbyCount">
          <p>Total players: {props.playerNames.length}</p>
        </Col>
      </Row> */}
    </Container>
  );
}

export default GameStats;
