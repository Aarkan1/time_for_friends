import React, { Component } from "react";
import FriendCard from "../components/FriendCard";
import Person from "../models/Person";

export default class FriendDetails extends Component {
  state = {
    friend: {
      phoneNumbers: [],
      mailAddresses: []
    }
  };

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
      <div>
        <h1>The friend page!</h1>
        <p>id: {this.props.match.params.id}</p>
        <p>Name: {f.name}</p>
        <p>Phonenumbers</p>
        {this.listPhoneNumbers(f.phoneNumbers)}
        <p>Emails</p>
        {this.listEmails(f.mailAddresses)}
      </div>
    );
  }
}
