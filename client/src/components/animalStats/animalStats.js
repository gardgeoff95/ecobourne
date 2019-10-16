import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Bear from '../../img/bear.png';
import Cheetah from '../../img/cheetah.png';
import Deer from '../../img/deer.png';
import Fox from '../../img/fox.png';
import Rabbit from '../../img/rabbit.png';
import Snake from '../../img/snake.png';
import Squirrel from '../../img/squirrel.png';
import Wolf from '../../img/wolf.png';

import './animalStats.css';


function AnimalStats(props) {
  // console.log(props);
  return (
    <Container className="statsContainer" fluid={true}>
      <div className="stats">
        {/* I have them in 3 rows now so they can be stacked vertially, feel free to change! */}
        {/* <Row>
          <div className="generalStats"></div>
        </Row> */}
        <Row id="animRow1">
          <Col id="animCol1">
            <div className="animal">
              <p className="animalTitle">Bunny Stats</p>
              <hr></hr>
              <p className="pop">Population: {props.bunnyStats.pop}</p>

              <p className="deathByStarvation">
                Starvation: {props.bunnyStats.starvation}
              </p>
              <p className="deathByPreditor">
                Predator: {props.bunnyStats.predator}
              </p>
              <p className="deathByOldAge">
                Old Age: {props.bunnyStats.oldAge}
              </p>
            </div>
          </Col>
          <Col id="animCol2">
            <div className="animal">
              <p className="animalTitle">Fox Stats</p>
              <hr></hr>
              <p className="pop">Population: {props.foxStats.pop}</p>
              <p className="deathByStarvation">
                Starvation: {props.foxStats.starvation}
              </p>
              <p className="deathByOldAge">
                Old Age: {props.foxStats.oldAge}
              </p>
            </div>
          </Col>
        </Row>
        <Row id="animRow2">
          <Col id="col3">
            <div className="animal">
              <p className="animalTitle">Bear Stats</p>
              <hr></hr>
              <p className="pop">Population: {props.bearStats.pop}</p>

              <p className="deathByStarvation">
                Starvation: {props.bearStats.starvation}
              </p>
              <p className="deathByOldAge">
                Old Age: {props.bearStats.oldAge}
              </p>
            </div>
          </Col>
          <Col id="animCol4"></Col>
        </Row>
      </div>
    </Container>
  );
}

export default AnimalStats;
