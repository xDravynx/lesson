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
  
  genre: {
    type: String,
    required: [true, 'Please add what genre is'],
    maxlength: [50, 'NO more than 50 characters']
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});

module.exports = mongoose.model("Game", gameSchema);