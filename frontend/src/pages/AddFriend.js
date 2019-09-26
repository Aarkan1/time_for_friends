import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { FriendsContext } from "../contexts/FriendsContext";
import Person from "../models/Person";
import M from "materialize-css";
import TimeSlider from "../components/TimeSlider";
import ct from 'countries-and-timezones'

class AddFriend extends Component {
  static contextType = FriendsContext;
  defaultFriend = {
    name: "",
    city: "",
    country: "Sweden",
    countryCode: "SE",
    timezone: "Europe/Stockholm",
    phoneNumbers: "",
    mailAddresses: "",
    works: '9-17',
    sleeps: '6-22'
  }
  state = {...this.defaultFriend};

  async componentDidMount() {
    M.FormSelect.init(document.querySelectorAll("select"));
  }

  validateForm() {
    let s = this.state;
    return (
      !!s.name.trim() &&
      !!s.city.trim() &&
      !!s.country.trim() &&
      !!s.timezone.trim() &&
      !!s.phoneNumbers.trim() &&
      !!s.mailAddresses.trim()
    );
  }

  async addNewFriend(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      console.warn("Error: Form did not validate");
      return;
    }

    let friend = { ...this.state };
    Object.assign(friend, {
      phoneNumbers: this.state.phoneNumbers.split("\n"),
      mailAddresses: this.state.mailAddresses.split("\n")
    });
    let person = new Person(friend);
    person = await person.save()
    this.props.history.push('/friend/' + person._id)
  }

  clearFields() {
    this.setState({...this.defaultFriend});
    document.querySelector("#friend-emails").style.height = "0px";
    document.querySelector("#friend-phone").style.height = "0px";
  }

  handleAddPhoneNumber(e, i) {
    let numbers = [...this.state.phoneNumbers];
    numbers[i] = e.target.value;
    this.setState({ phoneNumbers: numbers });
  }

  countryList() {
    return Object.values(ct.getAllCountries()).map(country => (
      <option key={country.id} value={JSON.stringify(country)}>
        {country.name}
      </option>
    ));
  }

  countryListChange(e) {
    let country = JSON.parse(e.target.value)
    this.setState({ countryCode: country.id, country: country.name })

    setTimeout(() => {
      M.FormSelect.init(document.querySelector("#timezone-list"));
    }, 5);
  }

  timezoneList() {
    return ct.getAllCountries()[this.state.countryCode].timezones.map(zone => (
      <option key={zone} value={zone}>
        {zone}
      </option>
    ));
  }

  setWorkTime(time) {
    this.setState({works: time.join('-')})
  }
  
  setSleepTime(time) {
    this.setState({sleeps: time.reverse().join('-')})
  }

  render() {
    return (
      <div className="row">
        <h4 className="center-align">Add new friend</h4>
        <form
          className="col s12 m8 l6 offset-m2 offset-l3"
          action=""
          onSubmit={e => this.addNewFriend(e)}
        >
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              id="friend-name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <label htmlFor="friend-name">Name</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">location_city</i>
            <input
              type="text"
              id="friend-city"
              value={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
            />
            <label htmlFor="friend-city">City</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">emoji_flags</i>
            <select
              defaultValue={'{"id":"SE","name":"Sweden","timezones":["Europe/Stockholm"]}'}
              onChange={e => this.countryListChange(e)}>
              {this.countryList()}
            </select>
            <label>Country</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">schedule</i>
            <select
            id="timezone-list"
              value={this.state.timezone}
              onChange={e => this.setState({ timezone: e.target.value })}
            >
              {this.timezoneList()}
            </select>
            <label>Timezone</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <textarea
              type="text"
              value={this.state.phoneNumbers}
              onChange={e => this.setState({ phoneNumbers: e.target.value })}
              className="materialize-textarea"
              id="friend-phone"
            />
            <label htmlFor="friend-phone">Phone numbers</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <textarea
              type="email"
              value={this.state.mailAddresses}
              onChange={e => this.setState({ mailAddresses: e.target.value })}
              className="materialize-textarea"
              id="friend-emails"
            />
            <label htmlFor="friend-emails">Email addresses</label>
          </div>
          <div className="row valign-wrapper">
            <i className="material-icons col">emoji_transportation</i>
            <p className="col">Working time</p>
          </div>
          <TimeSlider divId="time-slider-work" initTime="9-17" onUpdate={time => this.setWorkTime(time)} />
          <div className="row valign-wrapper">
            <i className="material-icons col">snooze</i>
            <p className="col">Sleeping time</p>
          </div>
          <TimeSlider divId="time-slider-sleep" initTime="6-22" onUpdate={time => this.setSleepTime(time)} />
            <br/>
          <div className="row">
            <button
              type="button"
              onClick={e => this.clearFields(e)}
              className="col offset-s2 waves-effect lighten-waves btn red lighten-2"
            >
              Clear
            </button>
            <button
              type="submit"
              onClick={e => this.addNewFriend(e)}
              className="col offset-s3 waves-effect lighten-waves btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddFriend)