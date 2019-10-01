import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

import FriendsContextProvider from "./contexts/FriendsContext";
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
      <FriendsContextProvider>
        <Router>
          <div id="top" className="App scrollspy row">
            <Navbar />
            <main className="container col s12 m8">
              <Route exact path="/" component={Home} />
              <Route exact path="/add-friend/:id?" component={AddFriend} />
              <Route
                exact
                path="/friend/:id?"
                render={props => <FriendDetails {...props} />}
              />
            </main>
            <a
              href="#top"
              id="to-top-btn"
              className="btn-floating btn-large orange lighten-1 waves-effect waves-light"
            >
              <i className="material-icons">keyboard_arrow_up</i>
            </a>
            <footer className="footer grey lighten-3 center-align valign-wrapper">
              <h6 className="copyright">&copy; 2019 Time for friends</h6>
            </footer>
          </div>
        </Router>
      </FriendsContextProvider>
    );
  }
}
