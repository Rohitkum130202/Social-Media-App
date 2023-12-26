const mongoose = require("mongoose");
const User = require("./userModel");

const userSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Enter the caption"],
  },
  description: {
    type: String,
    required: [true, "Enter the description"],
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", userSchema);
module.exports = Post;
