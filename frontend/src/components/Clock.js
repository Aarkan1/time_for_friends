import React, { Component } from "react";
import { sleep } from "../utilities/utils";

export default class Clock extends Component {
  offset = this.props.timeOffset * 60 * 60 * 1000
  _isMounted = false;
  state = {
    time: new Date(Date.now() + this.offset)
  }

  async updateTime() {
    while(this._isMounted) {
      this.setState({ time: new Date(Date.now() + this.offset) })
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
      <>
        <p>{this.props.city + ": " +this.state.time.toLocaleTimeString()}</p>
        <div>{this.props.children}</div>
        { this.props.fun ? (
          <p>Funny town</p>
        ):(
          <p>Boring town</p>
        )}
        <br/>
      </>
    );
  }
}
