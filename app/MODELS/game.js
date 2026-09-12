const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Game name"],
    unique: [true, "Game already in use"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  year: {
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
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
});

module.exports = mongoose.model("Game", gameSchema);