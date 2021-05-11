const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ 
  username: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashedPassword: {
    type: String,
    required: "Password is required",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
//   following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
//   followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

module.exports = mongoose.model('User', UserSchema)
