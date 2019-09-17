import React, { Component } from "react";
import { sleep } from "../utilities/utils";

export default class Clock extends Component {
  offset = (this.props.timeOffset + (new Date().getTimezoneOffset() / 60) || 0)
  _isMounted = false;
  state = {
    time: new Date(Date.now() + this.offset)
  }

  async updateTime() {
    while(this._isMounted) {
      this.setState({ time: new Date(Date.now() + this.offset) })
      this.props.onUpdate && this.props.onUpdate(this.state.time)
      await sleep(500)
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateTime()
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <span id="clock" className="center-align">
        <h4 id="clock-time">{this.state.time.toLocaleTimeString()}</h4>
        <h6 id="clock-date" className="grey-text">{this.state.time.toLocaleDateString()}</h6>
      </span>
    );
  }
}
