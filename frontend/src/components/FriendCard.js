import React from "react";
import Clock from "./Clock";
import { Route } from "react-router-dom";

const FriendCard = props => {
  function getLocaleTime() {
    let timeOffset = parseInt(props.timezone.substr(-2));
    return <Clock {...{ timeOffset: timeOffset }} />;
  }

  return (
    <Route
      render={({ history }) => (
        <div
          className="card waves-effect light-waves"
          onClick={() => history.push("/friend/" + props._id)}
        >
          <div className="card-content">
            <span className="card-title">{props.name}</span>
            <p>Local time</p>
            {getLocaleTime()}
          </div>
        </div>
      )}
    />
  );
};

export default FriendCard;
