import React from "react";

const FriendCard = props => {
  function listKittens(kittens) {
    return kittens.map((kitten, i) => (
      <div key={kitten.name + i}>
        <p>Name: {kitten.name}</p>
        <p>Age: {kitten.age}</p>
      </div>
    ));
  }

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{props.name}</span>
        <p>Age: {props.age}</p>
        {listKittens(props.kittens)}
      </div>
    </div>
  );
};

export default FriendCard;
