import React, { Component } from "react";
import "./App.css";
import Hello from "./components/Hello";
import Clock from "./components/Clock";
import { sleep } from "./utils";

export default class App extends Component {
  state = {
    greeting: "Hej!",
    cityTime: this.cityTime
  };

  cityTime = [
    { city: "Malmö", timeOffset: 0, fun: true },
    { city: "New York", timeOffset: -6, fun: true },
    { city: "London", timeOffset: -1, fun: false }
  ];

  async changeGreeting() {
    while (true) {
      await sleep(500);
      this.setState({ greeting: this.state.greeting + "!" });
    }
  }

  removeAClock(item) {
    this.cityTime.splice(this.cityTime.indexOf(item), 1);
    this.setState({ cityTime: this.cityTime });
  }

  componentDidMount() {
    // this.changeGreeting();
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
      <div className="App">
        <header className="App-header">
          <h2>{this.state.greeting}</h2>
          <Hello greeting="WoW" />
          {this.clockList()}
        </header>
      </div>
    );
  }
}
