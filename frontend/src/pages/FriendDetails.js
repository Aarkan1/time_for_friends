import React, { Component } from "react";
import Person from "../models/Person";
import Clock from "../components/Clock";

export default class FriendDetails extends Component {
  state = {
    friend: {
      phoneNumbers: [],
      mailAddresses: []
    }
  };

  getLocaleTime() {
    return <Clock {...{ timeOffset: this.state.friend.timeOffset }} />;
  }

  async componentDidMount() {
    let friend = await Person.findOne(this.props.match.params.id);
    console.log(friend);
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
      <div className="row">
        <h3 className="center-align">{f.name}</h3>
        <div className="col s12 m6 offset-m3">
          <div className="">{this.state.friend.timeOffset ? this.getLocaleTime() : ''}</div>
          <p>City: {f.city}</p>
          <p>Country: {f.country}</p>
          <p>Timezone: {f.timezone}</p>
          <p>Phone numbers</p>
          {this.listPhoneNumbers(f.phoneNumbers)}
          <p>Emails</p>
          {this.listEmails(f.mailAddresses)}
        </div>
      </div>
    );
  }
}