import React from "react";

function GameStats(props) {
  console.log(props);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="currentLobbyMembers col">
          <p>
            Current Lobby Members:{" "}
            {props.playerNames.map(player => player + " ")}
          </p>
        </div>
        <div className="lobbyMembers col">
          <p>Lobby: {props.lobbyMembers} / 5</p>
        </div>
      </div>
    </div>
  );
}

export default GameStats;
