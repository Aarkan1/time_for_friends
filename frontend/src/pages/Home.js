import React, { Component } from "react";
import { FriendsContext } from "../contexts/FriendsContext";
import FriendCard from "../components/FriendCard";
import Clock from "../components/Clock";
import TimeSlider from "../components/TimeSlider";
import Person from "../models/Person";

export default class Home extends Component {
  static contextType = FriendsContext;
  state = {
    search: "",
    isNight: false,
    sortName: true,
    searchByTimezone: false
  };

  componentDidMount() {
    this.filterFriends();
  }

  timeFilter(time) {
    const { setFilteredTime } = this.context;
    let start, end;
    start = time[0];
    end = time[1];
    setFilteredTime([start, end]);
  }

  setNight(e) {
    this.setState({
      isNight: e
    });
  }

  filterFriends() {
    let category = this.state.searchByTimezone ? "timezone" : "name";

    clearTimeout(this.throttleSearch);
    this.throttleSearch = setTimeout(async () => {
      let regex = new RegExp(this.state.search, "i");
      let friends = await Person.find({ [category]: regex }, { sort: "name" });
      this.context.setFriends(friends);
    }, 300);
  }

  listFriends() {
    let { filteredFriends } = this.context;
    return filteredFriends.map((friend, i) => (
      <div className="col s12 l6" key={friend.name + i}>
        <FriendCard {...friend} />
      </div>
    ));
  }

  sortByNameSwitch() {
    return (
      <span className="switch">
        <label>
          Name
          <input
            type="checkbox"
            value={this.state.sortName}
            onChange={e => {
              this.context.sortFriends(e.target.checked);
            }}
          />
          <span className="lever"></span>
          Timezone
        </label>
      </span>
    );
  }

  toggleSearchTimezone() {
    return (
      <div id="timezone-checkbox" className="row valign-wrapper">
        <label className="col s1">
          <input
            type="checkbox"
            className="filled-in"
            checked={this.state.searchByTimezone}
            onChange={e => {
              this.setState({ searchByTimezone: e.target.checked });
              setTimeout(() => {
                this.filterFriends();
              }, 5);
            }}
          />
          <span id="timezone-checkbox-span"></span>
        </label>
        <p className="col s11">Search by timezone</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="center-align">
          <br />
          <i
            id="main-day-icon"
            className={
              this.state.isNight
                ? "material-icons right blue-text text-darken-3"
                : "material-icons right orange-text"
            }
          >
            {this.state.isNight ? "nights_stay" : "wb_sunny"}
          </i>
          <Clock onUpdate={e => this.setNight(e)} />
        </div>
        <div className="row">
          <div className="col s12 l6 offset-l3">
              {this.toggleSearchTimezone()}
              <div className="input-field">
                <input
                  type="text"
                  value={this.state.search}
                  onChange={e => this.setState({ search: e.target.value })}
                  onKeyUp={() => this.filterFriends()}
                  id="search-query"
                />
                <label htmlFor="search-query">
                  Search friend by
                  {this.state.searchByTimezone ? " timezone" : " name"}
                </label>
            </div>
            <TimeSlider
              divId="time-slider-filter-friends"
              onUpdate={time => this.timeFilter(time)}
            />
            <p>Sort by: {this.sortByNameSwitch()}</p>
          </div>
        </div>
        <div className="App-header row">{this.listFriends()}</div>
      </div>
    );
  }
}
