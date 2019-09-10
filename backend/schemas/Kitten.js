const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let kittenSchema = new Schema({
  name: String,
  age: Number
});

class KittenClass {
  sayHi() {
    console.log(`Meow, my name is ${this.name}, and I'm ${this.age} years old`);
  }
}

kittenSchema.loadClass(KittenClass);

module.exports = db.model("Kitten", kittenSchema);
