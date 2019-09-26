import React, { Component, createContext } from "react";
import moment from "moment-timezone";

export const FriendsContext = createContext();

export default class FriendsContextProvider extends Component {
  state = {
    friends: [],
    filteredFriends: [],
    filteredTime: [0, 24]
    // addManyFriend: friends => this.addManyFriend(friends),
    // setFriends: friends => this.setFriends(friends),
    // setFilteredTime: time => this.setFilteredTime(time),
    // addFriend: friend => this.addFriend(friend),
    // sortFriends: checked => this.sortFriends(checked)
  };

  methodsFactory() {
    const ignoreMethods = ["constructor", "componentDidMount", "render", "methodsFactory"];
    const methods = Object.keys(Object.getOwnPropertyDescriptors(this.constructor.prototype))
    .filter(m => !ignoreMethods.includes(m));
    
    return Object.assign({}, ...methods.map(method => ({ [method]: event => this[method](event) })))
  }

  setFilteredTime(time) {
    this.setState({ filteredTime: [...time] });
    this.filterFriends();
  }

  filterFriends() {
    const { filteredTime, friends } = this.state;
    let filteredFriends = friends.filter(friend => {
      let offset = friend.timeOffset - moment().utcOffset() * 60 * 1000 || 0;
      let time = new Date(Date.now() + offset);
      let hour = time.getHours();
      return hour >= filteredTime[0] && hour <= filteredTime[1];
    });
    this.setState({ filteredFriends });
  }

  setFriends(friends) {
    this.setState({ friends, filteredFriends: friends });
  }

  addFriend(friend) {
    // don't duplicate friends
    if (this.state.friends.filter(f => f._id === friend._id).length) return;

    let friends = [...this.state.friends, friend];
    this.setState({ friends, filteredFriends: friends });
  }

  addManyFriend(friends) {
    friends.map(friend => this.addFriend(friend));
  }

  sortFriends(checked) {
    this.state.friends.sort((a, b) => !checked
        ? a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        : a.timezone < b.timezone ? -1 : 1
    );
    this.filterFriends();
  }

  render() {
    return (
      <FriendsContext.Provider value={{ ...this.state, ...this.methodsFactory() }}>
        {this.props.children}
      </FriendsContext.Provider>
    );
  }
}
