import React, { Component } from "react";
import { FriendsContext } from "../contexts/FriendsContext";
import Person from "../models/Person";
import Clock from "../components/Clock";
import { availabilityIcon } from "../utilities/utils";

export default class FriendDetails extends Component {
  static contextType = FriendsContext;
  state = {
    friend: {
      isNight: false,
      phoneNumbers: [],
      mailAddresses: []
    }
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
        {...{ timeOffset: this.state.friend.timeOffset }}
      />
    );
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    // load saved friend, or fetch from DB
    let friend =
      this.context.friends.filter(f => f._id === id)[0] ||
      (await Person.findOne(id));
    this.setState({ friend });
  }

  listEmails(emails) {
    return emails.map((email, i) => (
      <div key={email + i}>
        <p>{email}</p>
      </div>
    ));
  }

  listPhoneNumbers(phoneNumbers) {
    return phoneNumbers.map((number, i) => (
      <div key={number + i}>
        <p>{number}</p>
      </div>
    ));
  }

  render() {
    let f = this.state.friend;
    return (
      <div className="row friend-details">
        <h3 className="center-align">{f.name}</h3>
        <div className="col s12 m6 offset-m3">
          <div className="row valign-wrapper">
            <div className="col s8 offset-s2">
              {this.state.friend.timeOffset !== undefined ? this.getLocaleTime() : ""}
            </div>
            <div className="col s1">
              <i
                className={
                  this.state.isNight
                    ? "material-icons right blue-text text-darken-3"
                    : "material-icons right orange-text"
                }
              >
                {this.state.isNight ? "nights_stay" : "wb_sunny"}
              </i>
            </div>
            <div className="col s1">{availabilityIcon(this.state.friend)}</div>
          </div>
          <br/>
          <hr/>
          <div className="row">
            <div className="col s8">
              <p>City: {f.city}</p>
              <p>Country: {f.country}</p>
              <p>Zone: {f.timezone}</p>
            </div>
            <div className="col s4">
              <p>Works: {f.works}</p>
              <p>Sleeps: {f.sleeps}</p>
            </div>
          </div>
          <br/>
          <hr/>
          <p>Phone numbers</p>
          {this.listPhoneNumbers(f.phoneNumbers)}
          <br/>
          <hr/>
          <p>Emails</p>
          {this.listEmails(f.mailAddresses)}
        </div>
      </div>
    );
  }
}
