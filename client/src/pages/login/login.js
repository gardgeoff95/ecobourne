import React, { Component } from "react";
import axios from "axios";
// import LoginForm from '../../components/login/login';

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

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
    //More name verification should go on here.
    if (!(this.state.email === "") && !(this.state.password === "")) {
      console.log(this.state.email) 
      console.log(this.state.password)
      axios
        .post("/", { logEmail: this.state.email, pword: this.state.password })
        .then(res => {
          if (res.data.id && res.data.username && res.data.message === "success"){
            sessionStorage.setItem("username", res.data.username);
            this.props.goToTitleScreen();
          }
        });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div>
          <div>
            <form>
              <label>
                <input
                  className="fadeIn"
                  placeholder="Email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </label>

              <label>
                <input
                  className="fadeIn"
                  placeholder="Password"
                  type="text"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </label>

              <button
                id="playBtn"
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
