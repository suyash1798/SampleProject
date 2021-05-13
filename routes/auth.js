const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { newUserSchema, loginUserSchema } = require("../validations/user");
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
