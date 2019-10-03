import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Logo from "./../../components/logo/logo";
import Modal from 'react-bootstrap/Modal';
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
        <div className="titleSection">
          <Logo />
        </div>
        <Modal>test</Modal>
        <div className="userInput">
          <form>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
              />
            </label>

            <Button variant="primary" type="submit" value="Submit" onClick={this.handleSubmit}>Play</Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default TitleScreen;
