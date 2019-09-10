import React, { Component } from "react";

export default class AButton extends Component {
  state = {
    text: "Hej"
  };

  handleClick() {}

  render() {
    return (
      <>
        <p>{this.state.text}</p>
        <button>{this.props.children}</button>
      </>
    );
  }
}
