import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FriendsContext } from "../contexts/FriendsContext";
import Person from "../models/Person";
import Clock from "../components/Clock";
import { availabilityIcon } from "../utilities/utils";

class FriendDetails extends Component {
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
      <Clock onUpdate={e => this.setNight(e)}
        {...{ timeOffset: this.state.friend.timeOffset }} />
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

  editButton() {
    const id = this.props.match.params.id;
    return (
      <a
        id="edit-button"
        href={"add-friend/" + id}
        className="btn-floating btn-large orange lighten-1 waves-effect waves-light"
        onClick={e => {
          e.preventDefault();
          this.props.history.push("/add-friend/" + id);
        }} >
        <i className="material-icons i-edit-button">create</i>
      </a>
    );
  }

  render() {
    let f = this.state.friend;
    return (
      <div className="row friend-details">
        <h3 className="center-align">{f.name}</h3>
        <div className="col s12 m10 offset-m1 l6 offset-l3">
          <div className="row valign-wrapper">
            <div className="col s8 offset-s2">
              {this.state.friend.timeOffset !== undefined
                ? this.getLocaleTime()
                : ""}
            </div>
            <div className="col s1">
              <i className={
                  this.state.isNight
                    ? "material-icons right blue-text text-darken-3"
                    : "material-icons right orange-text"
                } >
                {this.state.isNight ? "nights_stay" : "wb_sunny"}
              </i>
            </div>
            <div className="col s1">{availabilityIcon(this.state.friend)}</div>
          </div>
          <br />
          <hr />
          <div className="row">
            <i className="material-icons col s1">location_city</i>
            <div className="col s7">
              <p>City: {f.city}</p>
              <p>Country: {f.country}</p>
              <p>Zone: {f.timezone}</p>
            </div>
            <div className="col s4">
              <p>Works: {f.works}</p>
              <p>Sleeps: {f.sleeps}</p>
            </div>
          </div>
          {f.phoneNumbers.length > 0 && (
            <div>
              <br />
              <hr />
              <div className="row">
                <i className="material-icons col s1">phone</i>
                <div className="col">
                  <p>Phone numbers</p>
                  {this.listPhoneNumbers(f.phoneNumbers)}
                </div>
              </div>
            </div>
          )}
          {f.mailAddresses.length > 0 && (
            <div>
              <br />
              <hr />
              <i className="material-icons col s1">email</i>
              <div className="col">
                <p>Emails</p>
                {this.listEmails(f.mailAddresses)}
              </div>{" "}
            </div>
          )}
        </div>
        {this.editButton()}
      </div>
    );
  }
}

export default withRouter(FriendDetails);
