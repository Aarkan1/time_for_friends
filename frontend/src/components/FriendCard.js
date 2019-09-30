import React, { Component } from "react";
import Clock from "./Clock";
import { Route } from "react-router-dom";
import { availabilityIcon } from '../utilities/utils'

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
                {availabilityIcon(this.props)}
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
