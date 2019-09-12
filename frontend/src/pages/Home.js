import React, { Component } from "react";
import Hello from "../components/Hello";
import Clock from "../components/Clock";
import { sleep } from "../utilities/utils";
import Person from '../models/Person'

export default class Home extends Component {
  state = {
    cityTime: this.cityTime
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
    let persons = await Person.find({name: /an/}, { populate: ['kittens'] })
    console.log(persons);
  }

  clockList() {
    return this.cityTime.map(time => (
      <div key={time.city}>
        <Clock {...time}>
          <p>Cool clock!</p>
        </Clock>
        <button onClick={e => this.removeAClock(time)}>Remove clock</button>
      </div>
    ));
  }

  render() {
    return (
      <div className="App-header">
        <Hello greeting="WoW" />
        {this.clockList()}
      </div>
    );
  }
}
