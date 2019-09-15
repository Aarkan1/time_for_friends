import React, { Component } from "react";
import Person from '../models/Person'

export default class AddFriend extends Component {

    async componentDidMount() {
      console.log(await Person.findOne('5d75f9ab9f405453784fb3c8'));
      
    }

  render() {
    return (
      <div>
        <h1>The about page!</h1>

        {this.props.match.params.lol}
      </div>
    );
  }
}
