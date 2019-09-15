import React, { Component } from "react";
import FriendCard from "../components/FriendCard";
import Clock from "../components/Clock";
import Person from "../models/Person";

export default class Home extends Component {
  state = {
    cityTime: this.cityTime,
    friends: []
  };

  cityTime = [
    { city: "Malmö", timeOffset: 0, fun: true },
    { city: "New York", timeOffset: -6, fun: true },
    { city: "London", timeOffset: -1, fun: false }
  ];

  removeAClock(item) {
    this.cityTime.splice(this.cityTime.indexOf(item), 1);
    this.setState({ cityTime: this.cityTime });
  }

  async componentDidMount() {
    let regex = new RegExp("AN", "i");
    let friends = await Person.find();
    this.setState({ friends });
    console.log(friends);
  }

  listFriends() {
    return this.state.friends.map((friend, i) => <FriendCard {...friend} key={friend.name + i} />);
  }

  render() {
    return (
      <div>
        <div className="row valign-wrapper">
          <h4>Your time</h4>
          <Clock />
        </div>
        <h4>Friends</h4>
        <div className="App-header">{this.listFriends()}</div>
      </div>
    );
  }
}
