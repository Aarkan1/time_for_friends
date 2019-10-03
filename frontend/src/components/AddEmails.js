import React from "react";

const AddEmails = props => {
  function mailAddresses() {
    return props.emails.map((email, i) => (
      <input
        key={"email" + i}
        type="email"
        className={"friend-email-" + i}
        id="friend-emails"
        value={email}
        placeholder={i ? "Email address " + (i + 1) : null}
        onChange={e => {
          document
            .querySelector(".friend-email-" + i)
            .classList.remove("validate-error");
          let mailAddresses = [...props.emails.filter(m => m), ""];
          mailAddresses[i] = e.target.value;
          props.onUpdate(mailAddresses)
        }}
      />
    ));
  }

  return (
    <div className="input-field">
      <i className="material-icons prefix">email</i>
      {mailAddresses()}
      <label htmlFor="friend-emails">Email addresses</label>
    </div>
  );
};

export default AddEmails;