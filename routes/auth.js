const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");
const validator = require("express-joi-validation").createValidator({});
const { newUserSchema, loginUserSchema } = require("../validations/user");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
const { signup, login } = require("../controllers/auth");

/* GET users listing. */
router.post(
  "/signup",
  validator.body(newUserSchema),
  signup
);

router.post(
  "/login",
  validator.body(loginUserSchema),
  login
);

module.exports = router;
