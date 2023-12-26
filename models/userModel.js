const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Enter the email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter the password"],
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
