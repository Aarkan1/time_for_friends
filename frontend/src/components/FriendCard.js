import React, { Component } from "react";
import Clock from "./Clock";
import { Route } from "react-router-dom";

export default class FriendCard extends Component {
  state = {
    isNight: false
  };

  setNight(e) {
    this.setState({
      isNight: e.getHours() > 18
    });
  }

  getLocaleTime() {
    return (
      <Clock
        onUpdate={e => this.setNight(e)}
        {...{ timeOffset: this.props.timeOffset }}
      />
    );
  }

  isSleeping() {
    let sleeps = this.props.sleeps.split("-");
    let start = sleeps[0].split(":");
    let startTime = parseInt(start[0]) + parseInt(start[1]) * 0.01;
    let stop = sleeps[1].split(":");
    let stopTime = parseInt(stop[0]) + parseInt(stop[1]) * 0.01;

    let today = new Date();
    let time = today.getHours() + today.getMinutes() * 0.01;

    console.log(
      `${time}, ${startTime}, ${stopTime}, `,
      time > startTime && time < stopTime
    );

    //   let sleeps = props.sleeps.split('-')
    //   let start = sleeps[0].split(':')
    //   let startTime = new Date();
    //   startTime.setHours(start[0] / 1)
    //   startTime.setMinutes(start[1] / 1)
    //   console.log(startTime, startTime.getMilliseconds() < Date.now());
    //   let stop = sleeps[1].split(':')
    //   let stopTime = new Date();
    //   stopTime.setDate(new Date().getDate() + 1)
    //   stopTime.setHours(stop[0] / 1)
    //   stopTime.setMinutes(start[1] / 1)
    //   console.log(stopTime, stopTime.getMilliseconds() > Date.now());
  }

  //   isSleeping()
  render() {
    return (
      <Route
        render={({ history }) => (
          <div
            className="card waves-effect light-waves"
            onClick={() => history.push("/friend/" + this.props._id)}
          >
            <div className="card-content">
              <div className="card-title">{this.props.name}
                  <i className={this.state.isNight 
                    ? 'material-icons right blue-text text-darken-3' 
                    : 'material-icons right orange-text'}>
                    {this.state.isNight ? 'nights_stay' : 'wb_sunny'}
                  </i>
              </div>
              <div className="row">
                <div className="col s6">
                  <p>{this.props.city}</p>
                  <p>{this.props.country}</p>
                </div>
                <div className="col s6">{this.getLocaleTime()}</div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}
