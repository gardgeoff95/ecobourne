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
          <div className="animal"></div>
        </div>
        <div className="row">
          <div className="animal"></div>
        </div>
        <div className="row">
          <div className="animal"></div>
        </div>
      </div>
    </div>
  );
}

export default AnimalStats;
