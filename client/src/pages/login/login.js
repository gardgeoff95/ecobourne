import React, { Component } from "react";
import axios from "axios";
// import LoginForm from '../../components/login/login';

import { startSession } from "mongoose";

import './login.css';

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("HERE");
    //More name verification should go on here.
    if (!(this.state.email === "") && !(this.state.password === "")) {

      console.log(this.state.email)
      console.log(this.state.password)
      axios
        .post("/", { logEmail: this.state.email, pword: this.state.password })
        .then(res => {
          console.log(res);
          if (res.data.id && res.data.username && res.data.message === "success") {
            sessionStorage.setItem("username", res.data.username)
            let name = res.data.username
            this.props.setAccountName(name)
            this.props.addPlayer(this.props.accountName);
            this.props.goToLobbyScreen();
          } else {
            console.log("MODAL HERE")
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div id="one">
          <div>
            <h1>LOG IN</h1>
            <form>
              <label>
                <input
                  className="emailLogin"
                  placeholder="Email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </label>

              <label>
                <input
                  className="loginPW"
                  placeholder="Password"
                  type="text"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </label>

              <button
                id="loginBtn"
                variant="primary"
                type="submit"
                value="Submit"
                onClick={this.handleSubmit}
              >
                Play
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
