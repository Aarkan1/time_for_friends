import React, { Component } from "react";
import { FriendsContext } from "../contexts/FriendsContext";
import * as noUiSlider from "nouislider/distribute/nouislider.js";
import wNumb from "wnumb";

export default class TimeSlider extends Component {
  static contextType = FriendsContext;

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

    let [start, end] = this.props.initTime ? this.props.initTime.split('-') : [0, 24]

    let slider = document.getElementById(this.props.divId);
    noUiSlider
      .create(slider, {
        start: [start, end],
        behaviour: 'drag-tap',
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
    let start = Math.round(value[0]);
    let end = Math.round(value[1]);

    this.props.onUpdate([start, end]);
  }

  render() {
    return (
      <>
        <div className="container" id={this.props.divId}></div>
        <br />
        <br />
      </>
    );
  }
}
