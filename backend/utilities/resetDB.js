module.exports = async function() {
  console.log("Resetting DB");
  let counter = 1;

  try {
    await mongoose.model("Person").deleteMany({});

    const friendsList = require("./friendsList");
    friendsList.map(friend => {
      mongoose.model("Person").create(friend, async (err, result) => {
        if (err) {
          console.error(err);
        }
      });
      console.log(`Created friend: ${counter++}/${friendsList.length}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
};
