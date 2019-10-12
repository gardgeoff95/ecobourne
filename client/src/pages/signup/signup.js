import React, { Component } from "react";
import axios from "axios";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

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
      this.props.setAccountName(username);
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
      <div className="container-fluid">
        <div>
          <div>
            <h1>SIGN UP</h1>

            <form>
              <label>
                <input
                  className=""
                  placeholder="Email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </label>

              <label>
                <input
                  className=""
                  placeholder="User Name"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </label>
              <label>
                <input
                  className=""
                  placeholder="Password"
                  type="text"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </label>

              <label>
                <input
                  className=""
                  placeholder="Enter your password again"
                  type="text"
                  value={this.state.passwordC}
                  onChange={this.onChangePasswordC}
                />
              </label>

              <button
                id=""
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

export default SignUp;
