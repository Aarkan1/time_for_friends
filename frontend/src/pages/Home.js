import React, { Component } from "react";
import FriendCard from "../components/FriendCard";
import Clock from "../components/Clock";
import Person from "../models/Person";
import * as noUiSlider from "nouislider/distribute/nouislider.js";
import wNumb from 'wnumb'
import moment from 'moment-timezone'

export default class Home extends Component {
  state = {
    search: "",
    friends: [],
    filteredFriends: [],
    filteredTime: [0, 24],
    isNight: false,
    sortName: true,
    searchByTimezone: false
  };

  componentDidMount() {
    this.filterFriends();

    let sliderRange = {
      'min': [ 0 ],
      '25%': [ 6 ],
      '50%': [ 12 ],
      '75%': [ 18 ],
      'max': [ 24 ]
    };

    let slider = document.getElementById("search-time-slider");
    noUiSlider.create(slider, {
      start: [0, 24],
      connect: true,
      step: 1,
      orientation: "horizontal",
      range: sliderRange,
      format: {
        to: (value) => {
          return value;
        },
        from: (value) => {
          return Number(value)
        }
      },
      pips: {
        mode: "range",
        density: 4,
        format: wNumb({
          mark: ':',
          decimals: 2
      })
      }
    }).on('update', (v, i) => this.timeFilter(v, i))
  }

  timeFilter(value, i) {
    let start, end;
    if(value) {
      start = Math.round(value[0])
      end =   Math.round(value[1])
    } else {
      start = this.state.filteredTime[0]
      end =   this.state.filteredTime[1]
    }
    
    let filteredFriends = this.state.friends.filter(friend => {
      let offset = (friend.timeOffset - moment().utcOffset() * 60 * 1000 || 0)
      let time = new Date(Date.now() + offset)
      let hour = time.getHours();
      return hour >= start && hour <= end
    })


    this.setState({ filteredFriends,
    filteredTime: [start, end] })
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
      this.setState({ friends, 
        filteredFriends: friends });
      this.timeFilter()

      console.log(friends);
    }, 300);
  }

  listFriends() {
    return this.state.filteredFriends.map((friend, i) => (
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
              this.state.friends.sort((a, b) =>
                !e.target.checked
                  ? a.name.toLowerCase() < b.name.toLowerCase()
                    ? -1
                    : 1
                  : a.timezone < b.timezone
                  ? -1
                  : 1
              );
            this.timeFilter()
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
      <span id="timezone-checkbox">
        <label>
          <input
            type="checkbox"
            className="filled-in"
            checked={this.state.searchByTimezone}
            onChange={e =>
              this.setState({ searchByTimezone: e.target.checked })
            }
          />
          <span id="timezone-checkbox-span"></span>
        </label>
      </span>
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
        <div className="search-friend row valign-wrapper">
          {this.toggleSearchTimezone()}
          <div className="input-field right col s11">
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
        </div>
        <p>Sort by: {this.sortByNameSwitch()}</p>
        
        <div className="container" id="search-time-slider"></div>
        <br/>
        <br/>
        <div className="App-header row">{this.listFriends()}</div>
      </div>
    );
  }
}
