const Joi = require("joi");

const newPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const paramValidation = Joi.object({
    postId: Joi.string().required()
})

const updatePostValidation = Joi.object({
    title: Joi.string().optional().not(null),
    description: Joi.string().optional().not(null),
});

module.exports = { newPostSchema,paramValidation,updatePostValidation };
