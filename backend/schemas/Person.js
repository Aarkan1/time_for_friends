const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: String,
  age: Number,
  kittens: [{ type: ObjectId, ref: "Kitten" }]
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
