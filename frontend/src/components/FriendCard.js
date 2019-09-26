import React, { Component } from "react";
import Clock from "./Clock";
import { Route } from "react-router-dom";

export default class FriendCard extends Component {
  state = {
    isNight: false
  };

  setNight(e) {
    this.setState({
      isNight: e
    });
  }

  getLocaleTime() {
    return (
      <Clock
        onUpdate={e => this.setNight(e)}
        {...{ timeOffset: this.props.timeOffset, timezone: this.props.timezone }}
      />
    );
  }

  availability() {
    if(!this.props.works && !this.props.sleeps) return;

    let [workStart, workEnd] = this.props.works.split('-');
    let [sleepStart, sleepEnd] = this.props.sleeps.split('-');
    const localeHour = new Date(Date.now() + this.props.timeOffset).getHours();

    const isWorking = workStart < localeHour && workEnd > localeHour;
    const isSleeping = sleepEnd > localeHour || sleepStart < localeHour;

    return (isWorking ? <i className="material-icons right">emoji_transportation</i> 
          : isSleeping ? <i className="material-icons right">snooze</i> 
          : <i className="material-icons right">mood</i>)
  }

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
                {this.availability()}
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
                  <p>{this.props.timezone}</p>
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
