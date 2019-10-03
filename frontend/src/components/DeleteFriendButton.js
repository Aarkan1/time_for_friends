import React from "react";
import { withRouter } from "react-router-dom";
import Person from "../models/Person";

const DeleteFriendButton = props => {
  const id = props.match.params.id;
  return (
    <a
      href={"add-friend/" + id}
      className="btn red lighten-1 waves-effect waves-light col s3 offset-s4"
      onClick={async e => {
        e.preventDefault();
        let person = await Person.findOne(id);
        console.log(await person.delete());
        props.history.push("/");
      }}
    >
      Delete
    </a>
  );
};

export default withRouter(DeleteFriendButton);
