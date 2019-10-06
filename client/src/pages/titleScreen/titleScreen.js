import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Logo from "../../components/Logo/logo";
import Logo2 from "./../../components/Logo2/logo2";
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { slide as Menu } from 'react-burger-menu'
import './titleScreen.css';


class TitleScreen extends Component {
  state = {
    name: "",
    value: ""
  };


  handleSubmit = event => {
    event.preventDefault();
    //More name verification should go on here.
    if (!(this.state.value === "")) {
      this.props.addPlayer(this.state.value);
    }
  };

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    console.log("My type of props: ", this.props);
    return (
      <Container>
        <div className="row">
          <div className="titleSection">
            <Logo />
          </div>
        </div>
        <div className="row">
          <div>
            <Logo2 />
          </div>
        </div>
        <div className="userInput">
          <form>
            <label>
              <input
                className="fadeIn"
                placeholder="Nickname"
                type="text"
                value={this.state.value}
                onChange={this.onChange}
              />
            </label>

            <button id="playBtn" variant="primary" type="submit" value="Submit" onClick={this.handleSubmit}>Play</button>
          </form>
        </div>
      </Container>
    );
  }
}

export default TitleScreen;
