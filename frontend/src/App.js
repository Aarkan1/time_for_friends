import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import Home from "./pages/Home";
import AddFriend from "./pages/AddFriend";
import FriendDetails from "./pages/FriendDetails";
import Navbar from "./components/Navbar";

export default class App extends Component {
  componentDidMount() {
    // Auto initialize all the materialize things
    M.AutoInit();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/add-friend" component={AddFriend} />
            <Route exact path="/friend/:id?" component={FriendDetails} />
          </main>
          <footer className="footer light-blue darken-1 white-text center-align valign-wrapper">
            <h6 className="copyright">&copy; 2019 Time for friends</h6>
          </footer>
        </div>
      </Router>
    );
  }
}
