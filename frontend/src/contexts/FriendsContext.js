import React, { Component, createContext } from "react";

export const FriendsContext = createContext();

export default class FriendsContextProvider extends Component {
  state = {
    friends: [],
    filteredFriends: [],
    addManyFriend: friends => this.addManyFriend(friends),
    setFriends: friends => this.setFriends(friends),
    filterFriends: friends => this.filterFriends(friends),
    addFriend: friend => this.addFriend(friend),
    sortFriends: checked => this.sortFriends(checked)
  };

  filterFriends(filteredFriends) {
    this.setState({ filteredFriends });
  }

  setFriends(friends) {
    this.setState({ friends, filteredFriends: friends });
  }

  addFriend(friend) {
    // don't duplicate friends
    if(this.state.friends.filter(f => f._id === friend._id).length) return;

    console.log('adding friend:', friend);
    let friends = [...this.state.friends, friend];
    this.setState({ friends, filteredFriends: friends });
  }

  addManyFriend(friends) {
    friends.map(friend => this.addFriend(friend));
  }

  sortFriends(checked) {
    this.state.friends.sort((a, b) =>
      !checked
        ? a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : 1
        : a.timezone < b.timezone
        ? -1
        : 1
    );
  }

  render() {
    return (
      <FriendsContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </FriendsContext.Provider>
    );
  }
}
