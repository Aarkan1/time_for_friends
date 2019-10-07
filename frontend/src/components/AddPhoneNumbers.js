import React from "react";

const AddPhoneNumber = props => {
  function phoneNumbers() {
    return props.numbers.map((number, i) => (
      <input
        key={"number" + i}
        type="text"
        className={"friend-phone-" + i}
        id="friend-phone"
        placeholder={i ? "Phone number " + (i + 1) : null}
        value={number
          .replace(/[^\d\s-+]/, "")
          .replace(/-+/g, "-")
          .replace(/\++/g, "+")
          .replace(/\s+/g, " ")}
        onChange={e => {
          document
            .querySelector(".friend-phone-" + i)
            .classList.remove("validate-error");
          let phoneNumbers = [...props.numbers.filter(p => p), ""];
          phoneNumbers[i] = e.target.value;
          props.onUpdate(phoneNumbers);
        }}
      />
    ));
  }

  return (
    <div className="input-field">
      <i className="material-icons prefix">phone</i>
      {phoneNumbers()}
      <label htmlFor="friend-phone">Phone numbers</label>
    </div>
  );
};

export default AddPhoneNumber;
