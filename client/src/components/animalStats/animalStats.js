import React from "react";

function AnimalStats(props) {
  console.log(props);
  return (
    <div className="container-fluid">
      <div className="stats">
        {/* I have them in 3 rows now so they can be stacked vertially, feel free to change! */}
        <div className="row">
          <div className="generalStats"></div>
        </div>
        <div className="row">
          <div className="animal">
            <h1>Bunny Stats</h1>

            <p className="pop">Population: {props.bunnyStats.pop}</p>
            <p className="deathByStarvation">
              Death by Starvation: {props.bunnyStats.starvation}
            </p>
            <p className="deathByPreditor">
              Death by Preditor: {props.bunnyStats.preditor}
            </p>
            <p className="deathByOldAge">
              Death by Old Age: {props.bunnyStats.oldAge}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="animal">
            <h1>Fox Stats</h1>

            <p className="pop">Population: {props.foxStats.pop}</p>
            <p className="deathByStarvation">
              Death by Starvation: {props.foxStats.starvation}
            </p>
            <p className="deathByOldAge">
              Death by Old Age: {props.bunnyStats.oldAge}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="animal">
            <h1>Bear Stats</h1>

            <p className="pop">Population: {props.bearStats.pop}</p>
            <p className="deathByStarvation">
              Death by Starvation: {props.bearStats.starvation}
            </p>
            <p className="deathByOldAge">
              Death by Old Age: {props.bunnyStats.oldAge}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalStats;
