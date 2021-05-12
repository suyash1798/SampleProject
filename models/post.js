const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Name required",
  },
  description: {
    type: String,
    trim: true,
    required: "Title required",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "User Required",
  },
});

module.exports = mongoose.model("Post", PostSchema);
