import React, { Component } from "react";
import Logo from "../../components/Logo/logo";

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
      <div className="container-fluid">
        <div className="titleSection">
          {/* <p>EcoBourne</p> */}
          <Logo />
        </div>
        <div className="userInput">
          <form>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
              />
            </label>

            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default TitleScreen;