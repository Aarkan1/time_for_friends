import React, { Component } from "react";
import { sleep } from "../utilities/utils";
import moment from 'moment-timezone'

export default class Clock extends Component {
  offset = (this.props.timeOffset - moment().utcOffset() * 60 * 1000 || 0)
  timezone = this.props.timezone || moment.tz.guess()
  _isMounted = false;
  state = {
    time: new Date(Date.now() + this.offset)
  }

  async updateTime() {
    while(this._isMounted) {
      this.setState({ time: new Date(Date.now() + this.offset) })
      this.props.onUpdate && this.props.onUpdate(this.state.time.getHours() > 20 || this.state.time.getHours() < 8)
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
