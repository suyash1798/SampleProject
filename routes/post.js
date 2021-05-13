const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");
const validator = require("express-joi-validation").createValidator({});
const {
  newPostSchema,
  paramValidation,
  updatePostValidation,
} = require("../validations/post");
const { addPost, updatePost, getPost,getAllPosts } = require("../controllers/post");

/* GET users listing. */
router.post(
  "/add-post",
  validator.body(newPostSchema),
  addPost
);

router.put(
  "/update-post/:postId",
  validator.params(paramValidation),
  validator.body(updatePostValidation),
 updatePost
);

router.get("/all-post",getAllPosts);

router.delete(
  "/delete-post/:postId",
  validator.params(paramValidation),
  getPost
);

module.exports = router;
