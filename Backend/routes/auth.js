const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");
const validator = require("express-joi-validation").createValidator({});
const { newUserSchema, loginUserSchema } = require("../validations/user");
const jwt = require("jsonwebtoken");
const { omit } = require('lodash')

/* GET users listing. */
router.post(
  "/signup",
  validator.body(newUserSchema),
  async (req, res, next) => {
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
);

router.post(
  "/login",
  validator.body(loginUserSchema),
  async (req, res, next) => {
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
    delete user.hashedPassword;
    console.log(user.hashedPassword)
    const token = jwt.sign({ data: user }, "10000", {
      expiresIn: "5h",
    });
    res.cookie("auth", token);
    return res
      .status(HttpStatus.StatusCodes.OK)
      .json({ message: "Login successful",token });
  }
);

module.exports = router;
