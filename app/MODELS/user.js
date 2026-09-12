const mongoose = require("mongoose");
const { describe } = require("node:test");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Username"],
    unique: [true, "User already in use"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter a valid email address",
    ],
  },
  genre: {
    type: String,
    required: true,
    describe: [50, 'Tell me your favor genre of games.']
  }
});

module.exports = mongoose.model("User", userSchema);