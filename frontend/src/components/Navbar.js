import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css'

export default class Navbar extends Component {
componentDidMount() {
  this.changeTheme()
}

  closeSidenav() {
    M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
  }

  changeTheme(theme) {
    theme = !theme ? 'light' : 'dark';
    document.documentElement.style.setProperty(`--theme-bg`, `var(--${theme}-mode-bg)`);
    document.documentElement.style.setProperty(`--theme-ui`, `var(--${theme}-mode-ui)`);
    document.documentElement.style.setProperty(`--theme-text`, `var(--${theme}-mode-text)`);
  }

  toggleDarkMode() {
    return (
      <span className="switch">
        <label>
          Light
          <input
            type="checkbox"
            onChange={e => this.changeTheme(e.target.checked)}
          />
          <span className="lever"></span>
          Dark
        </label>
      </span>
    );
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
                {this.toggleDarkMode()}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-friend">Add Friend</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        {/* hidden side menu that toggles on mobile */}
        <ul className="sidenav center-align" id="mobile-links">
          {this.toggleDarkMode()}
          <li><Link onClick={() => this.closeSidenav() } to="/">Home</Link></li>
          <li><Link onClick={() => this.closeSidenav() } to="/add-friend">Add Friend</Link></li>
        </ul>
      </>
    );
  }
};

