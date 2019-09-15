import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css'

export default class Navbar extends Component {
  closeSidenav() {
    M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
  }

  render() {
    return (
      <div className="navbar-fixed2">
        <nav className="nav-wrapper light-blue darken-1">
          <div className="container">
            <Link className="brand-logo" to="/">Time for friends</Link>
            <a className="sidenav-trigger" data-target="mobile-links"><i className="material-icons">menu</i></a>
            
            {/* desktop links */}
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-friend">Add Friend</Link></li>
              <li><Link to="/friend/5d75f9ab9f405453784fb3c8">Show friend</Link></li>
            </ul>

            {/* hidden side menu that toggles on mobile */}
            <ul className="sidenav" id="mobile-links">
              <li><Link onClick={() => this.closeSidenav() } to="/">Home</Link></li>
              <li><Link onClick={() => this.closeSidenav() } to="/add-friend">Add Friend</Link></li>
              <li><Link onClick={() => this.closeSidenav() } to="/friend/5d75f9ab9f405453784fb3c8">Show friend</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

