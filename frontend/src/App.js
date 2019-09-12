import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </main>
          <footer><h5>I'm a footer</h5></footer>
        </div>
      </Router>
    );
  }
}
