import React, { Component } from "react";
import FriendCard from "../components/FriendCard";
import Clock from "../components/Clock";
import Person from "../models/Person";

export default class Home extends Component {
  state = {
    search: '',
    friends: [],
    isNight: false,
    sortName: true
  };

  componentDidMount() {
    this.filterFriends();
  }

  setNight(e) {
    this.setState({
      isNight: e
    });
  }

  filterFriends() {
    clearTimeout(this.throttleSearch);
    this.throttleSearch = setTimeout(async () => {
      let regex = new RegExp(this.state.search, "i");
      let friends = await Person.find({name: regex}, {sort: 'name'});
      this.setState({ friends });
      console.log(friends);
    }, 300);
  }

  listFriends() {
    return this.state.friends
    .map((friend, i) => (
      <div className="col s12 l6" key={friend.name + i}>
        <FriendCard {...friend} />
      </div>
    ))
  }

  sortByNameSwitch() {
    return (
      <div className="switch">
        <label>
          Name
          <input type="checkbox" value={this.state.sortName} 
            onChange={e => {
              this.state.friends.sort((a, b) => !e.target.checked 
                ? (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) 
                : (a.timezone < b.timezone ? -1 : 1))
            }} />
          <span className="lever"></span>
          Timezone
        </label>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="center-align">
          <br/>
          <i id="main-day-icon" className={this.state.isNight 
            ? 'material-icons right blue-text text-darken-3' 
            : 'material-icons right orange-text'}>
            {this.state.isNight ? 'nights_stay' : 'wb_sunny'}
          </i>
          <Clock onUpdate={e => this.setNight(e)} />
          <div className="input-field container">
            <input type="text" 
              value={this.state.search} 
              onChange={e => this.setState({search: e.target.value})} 
              onKeyUp={() => this.filterFriends()} id="search-query" />
            <label htmlFor="search-query">Search for friend</label>
          </div>
          {this.sortByNameSwitch()}
        </div>
        <div className="App-header row">{this.listFriends()}</div>
      </div>
    );
  }
}
