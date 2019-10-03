import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { FriendsContext } from "../contexts/FriendsContext";
import Person from "../models/Person";
import M from "materialize-css";
import DeleteFriendButton from "../components/DeleteFriendButton";
import AddPhoneNumbers from "../components/AddPhoneNumbers";
import AddEmails from "../components/AddEmails";
import TimeSlider from "../components/TimeSlider";
import ct from 'countries-and-timezones'
import { sleep, validateForm } from '../utilities/utils'

class AddFriend extends Component {
  static contextType = FriendsContext;
  defaultFriend = {
    name: "",
    city: "",
    country: "Sweden",
    countryCode: "SE",
    timezone: "Europe/Stockholm",
    phoneNumbers: [""],
    mailAddresses: [""],
    works: '9-17',
    sleeps: '6-22'
  }
  state = {...this.defaultFriend};

  async componentDidMount() {
    const id = this.props.match.params.id;
    if(id) {
      let person = this.context.friends.filter(f => f._id === id)[0] || await Person.findOne(id);
      this.setState({...person})

      await sleep(5);
      
      // Extreme workaround because of Materialize css boilerplate
      let country = document.querySelector('#country-list')
      let countryOptions = country.querySelectorAll('option')
      countryOptions = [...countryOptions].filter(c => c.innerHTML === this.state.country)[0]
      country.value = countryOptions.value
      this.countryListChange({target: { value: countryOptions.value }})
      
      let timezoneList = document.querySelector("#timezone-list")
      timezoneList.value = this.state.timezone
      
      // fix for label bug
      await sleep(50);
      // eslint-disable-next-line
      for(let el of document.querySelectorAll('input')) {
        el.focus();
        await sleep(5);
        el.blur();
      }
    } else {
      this.countryListChange({target: { value: '{"id":"SE","name":"Sweden","timezones":["Europe/Stockholm"]}'}})
    }
    
    M.FormSelect.init(document.querySelectorAll("select"));
  }

  async addNewFriend(e) {
    e.preventDefault();
    this.setState({
      phoneNumbers: this.state.phoneNumbers.filter(p => p),
      mailAddresses: this.state.mailAddresses.filter(m => m)
    })

    await sleep(5)

    console.log(this.state);
    
    
    if (!validateForm(this.state)) {
      console.warn("Error: Form did not validate");
      this.setState({
        phoneNumbers: [...this.state.phoneNumbers.filter(p => p), ""],
        mailAddresses: [...this.state.mailAddresses.filter(m => m), ""]
      })
      return;
    }

    let person = new Person(this.state);
    person = await person.save()
    this.props.history.push('/friend/' + person._id)
  }

  clearFields() {
    this.setState({...this.defaultFriend});
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

  async countryListChange(e) {
    let country = JSON.parse(e.target.value)
    this.setState({ countryCode: country.id, country: country.name })

    await sleep(5)
    let timezoneList = document.querySelector("#timezone-list")
    M.FormSelect.init(timezoneList);
    this.setState({timezone: timezoneList.querySelectorAll('option')[0].value})
  }

  timezoneList() {
    return ct.getAllCountries()[this.state.countryCode].timezones.map(zone => (
      <option key={zone} value={zone}>
        {zone}
      </option>
    ));
  }

  setWorkTime(time) {
    document.querySelector('#work-sleep-sliders').classList.remove("validate-error");
    this.setState({works: time.join('-')})
  }
  
  setSleepTime(time) {
    document.querySelector('#work-sleep-sliders').classList.remove("validate-error");
    this.setState({sleeps: time.reverse().join('-')})
  }


  render() {
    return (
      <div className="row">
        <h4 className="center-align">{this.props.match.params.id ? 'Edit friend' : 'Add new friend'}</h4>
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
              onChange={e => {
                document.querySelector('#friend-name').classList.remove("validate-error")
                this.setState({ name: e.target.value })
                }}
            />
            <label htmlFor="friend-name">Name</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">location_city</i>
            <input
              type="text"
              id="friend-city"
              value={this.state.city}
              onChange={e => {
                document.querySelector('#friend-city').classList.remove("validate-error")
                this.setState({ city: e.target.value })
              }}
            />
            <label htmlFor="friend-city">City</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">emoji_flags</i>
            <select
            id="country-list"
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
            onChange={e => {
                console.log(e.target.value);
                this.setState({ timezone: e.target.value })
              }}
            >
              {this.timezoneList()}
            </select>
            <label>Timezone</label>
          </div>
          <AddPhoneNumbers numbers={this.state.phoneNumbers} onUpdate={phoneNumbers => {
            this.setState({phoneNumbers});
            }}/>
          <AddEmails emails={this.state.mailAddresses} onUpdate={mailAddresses => {
            this.setState({mailAddresses});
            }}/>
          <div id="work-sleep-sliders">
            <div className="row valign-wrapper">
              <i className="material-icons col">emoji_transportation</i>
              <p className="col">Working time</p>
            </div>

            <TimeSlider divId="time-slider-work" 
              initTime={this.state.works} 
              updateTime={this.state.works} 
              onUpdate={time => this.setWorkTime(time)} />
            <div className="row valign-wrapper">
              <i className="material-icons col">snooze</i>
              <p className="col">Sleeping time</p>
            </div>
            {/* Needs to reverse sleep time to update slider correctly */}
            <TimeSlider divId="time-slider-sleep" 
              initTime={this.state.sleeps} 
              updateTime={this.state.sleeps.split('-').reverse().join('-')} 
              onUpdate={time => this.setSleepTime(time)} />
          </div>
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
          {this.props.match.params.id && 
          (<div className="row">
            <br/>
            <br/>
            <DeleteFriendButton />
          </div>)}
        </form>
      </div>
    );
  }
}

export default withRouter(AddFriend)