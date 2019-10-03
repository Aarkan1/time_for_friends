const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: String,
  phoneNumbers: Array,
  mailAddresses: Array,
  city: String,
  country: String,
  countryCode: String,
  timezone: String,
  sleeps: String,
  works:  String
});

class PersonClass {}

personSchema.loadClass(PersonClass);

module.exports = db.model("Person", personSchema);
