import React, { Component } from "react";
import {FriendsContext} from '../contexts/FriendsContext'
import * as noUiSlider from "nouislider/distribute/nouislider.js";
import wNumb from "wnumb";
import moment from "moment-timezone";

export default class TimeSlider extends Component {
  static contextType = FriendsContext;
  state = {
    filteredTime: [0, 24]
  };

  componentDidMount() {
    this.initSlider();
  }

  initSlider() {
    let sliderRange = {
      min: [0],
      "25%": [6],
      "50%": [12],
      "75%": [18],
      max: [24]
    };

    let slider = document.getElementById("search-time-slider");
    noUiSlider
      .create(slider, {
        start: [0, 24],
        connect: true,
        step: 1,
        tooltips: [
          wNumb({
            mark: ":",
            decimals: 2,
            encoder: function(value) {
              return Math.round(value);
            }
          }),
          wNumb({
            mark: ":",
            decimals: 2,
            encoder: function(value) {
              return Math.round(value);
            }
          })
        ],
        orientation: "horizontal",
        range: sliderRange,
        format: {
          to: value => {
            return value;
          },
          from: value => {
            return Number(value);
          }
        },
        pips: {
          mode: "range",
          stepped: true,
          density: 4,
          format: wNumb({
            mark: ":",
            decimals: 2
          })
        }
      })
      .on("update", (v, i) => this.timeFilter(v, i));
  }

  timeFilter(value, i) {
    let start, end;
    if (value) {
      start = Math.round(value[0]);
      end = Math.round(value[1]);
    } else {
      start = this.state.filteredTime[0];
      end = this.state.filteredTime[1];
    }
    this.setState({ filteredTime: [start, end] });

    const {friends, filterFriends} = this.context;

    let filteredFriends = friends.filter(friend => {
      let offset = friend.timeOffset - moment().utcOffset() * 60 * 1000 || 0;
      let time = new Date(Date.now() + offset);
      let hour = time.getHours();
      return hour >= start && hour <= end;
    });

    filterFriends(filteredFriends);
  }

  render() {
    return <div className="container" id="search-time-slider"></div>;
  }
}
