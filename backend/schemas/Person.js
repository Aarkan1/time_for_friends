const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: String,
  phoneNumbers: Array,
  mailAddresses: Array,
  city: String,
  country: String,
  timezone: String,
  sleeps: String,
  works:  String
});

class PersonClass {

  showKittens() {
    this.kittens.forEach(kitten => {
      kitten.sayHi();
    });
  }
}

personSchema.loadClass(PersonClass);

module.exports = db.model("Person", personSchema);
