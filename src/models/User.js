const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
userSchema.plugin(timestamp);
module.exports = mongoose.model("User", userSchema);
