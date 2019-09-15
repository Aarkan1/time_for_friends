import React, { Component } from "react";
import FriendCard from '../components/FriendCard'
import Person from "../models/Person";

export default class FriendDetails extends Component {
  state = {
    friend: { kittens: [] }
  };

  async componentDidMount() {
    let friend = await Person.findOne("5d75f9ab9f405453784fb3c8");
    console.log(friend);
    this.setState({ friend });
  }



  render() {
    return (
      <div>
        <h1>The friend page!</h1>
        <p>id: {this.props.match.params.id}</p>

        <FriendCard {...this.state.friend} />
      </div>
    );
  }
}
