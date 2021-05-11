const Joi = require("joi");

const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username:Joi.string().required(),
  password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { newUserSchema, loginUserSchema };
