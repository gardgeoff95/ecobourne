import React, { Component } from "react";
import axios from "axios";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './signup.css';

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordC: ""
  };
  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  onChangeUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  onChangePasswordC = event => {
    this.setState({
      passwordC: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("HERE");
    //More name verification should go on here.
    if (
      !(this.state.email === "") &&
      !(this.state.password === "") &&
      !(this.state.username === "") &&
      !(this.state.passwordC === "")
    ) {
      //   this.props.setAccountName(username);
      axios
        .post("/", {
          email: this.state.email,
          password: this.state.password,
          passwordConf: this.state.passwordC,
          username: this.state.username
        })
        .then(res => {
          //NEEDS WORK
          console.log(res);
          if (res.data.correct) {
            this.props.goToSignIn();
          } else {
            console.log("WRONG");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col id="one">
            <div className="signUpDiv">
              <form className="createForm">
                <div id="fadeInEmail">
                  <h1 id="signupHeader">SIGN UP</h1>
                  <p className="inputText">Enter your email</p>
                  <input
                    className="email"
                    placeholder="Email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div id="fadeInUsername">
                  <p className="inputText">Choose a username</p>
                  <input
                    className="username"
                    placeholder="Username"
                    type="text"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </div>

                <div id="fadeInPW">
                  <p className="inputText">Set your Password</p>
                  <input
                    className="pword"
                    placeholder="Password"
                    type="text"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>

                <div id="fadeInPWConf">
                  <p className="inputText">Confirmation</p>
                  <input
                    className="pwordConf"
                    placeholder="Confirm Password"
                    type="text"
                    value={this.state.passwordC}
                    onChange={this.onChangePasswordC}
                  />
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <button
            className="fadeinBtn"
            id="loginPlaybtn"
            variant="primary"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          >
            Login
                  </button>
        </Row>
      </Container>
    );
  }
}
export default SignUp;