import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css'

export default class Navbar extends Component {
  closeSidenav() {
    M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
  }

  render() {
    return (
      <>
        {/* Needs the sidenav element to be parallel with the navbar, 
            because of an overlay bug */}
        <div className="navbar-fixed">
          <nav className="nav-wrapper orange lighten-1">
            <div className="container">
              <Link className="brand-logo" to="/">Time for friends</Link>
              <a href="!#" className="sidenav-trigger" data-target="mobile-links"><i className="material-icons">menu</i></a>
              
              {/* desktop links */}
              <ul className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-friend">Add Friend</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        {/* hidden side menu that toggles on mobile */}
        <ul className="sidenav center-align" id="mobile-links">
          <li><Link onClick={() => this.closeSidenav() } to="/">Home</Link></li>
          <li><Link onClick={() => this.closeSidenav() } to="/add-friend">Add Friend</Link></li>
        </ul>
      </>
    );
  }
};

