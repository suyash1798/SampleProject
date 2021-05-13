const User = require("../models/user");
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const newUser = req.body;
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(HttpStatus.StatusCodes.CONFLICT)
        .json({ message: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    user = await User.create({ ...newUser, hashedPassword });
    res.send(user);
}

const login = async (req, res, next) => {
    const newUser = req.body;
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(HttpStatus.StatusCodes.UNAUTHORIZED)
        .json({ message: "Email/Password not valid" });
    }
    const isValidPassword = await bcrypt.compare(
      newUser.password,
      user.hashedPassword
    );
    if (!isValidPassword) {
      return res
        .status(HttpStatus.StatusCodes.UNAUTHORIZED)
        .json({ message: "Email/Password not valid" });
    }
    delete user._doc.hashedPassword;
    user = user._doc;
    const token = jwt.sign({ data: user }, "10000", {
      expiresIn: "5h",
    });
    res.cookie("auth", token);
    return res
      .status(HttpStatus.StatusCodes.OK)
      .json({ message: "Login successful", token, user });
  }

module.exports = {signup,login}