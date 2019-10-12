import React, { Component } from "react";
// import LoginForm from '../../components/login/login';

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class Login extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <div>
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
