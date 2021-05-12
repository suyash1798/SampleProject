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
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");

/* GET users listing. */
router.post(
  "/add-post",
  validator.body(newPostSchema),
  async (req, res, next) => {
    const newPost = req.body;
    post = await Post.create({ ...newPost, user: '609968c9047820646ba926e0' });
    // console.log(req.user);
    res.send(post);
  }
);

router.put(
  "/update-post/:postId",
  validator.params(paramValidation),
  validator.body(updatePostValidation),
  async (req, res, next) => {
    const newPost = req.body;
    const { postId } = req.params;
    post = await Post.updateOne({ _id: postId }, newPost);
    post = await Post.findOne({ _id: postId });
    res.send(post);
  }
);

router.get("/all-post", async (req, res, next) => {
  const posts = await Post.find();
  res.send(posts);
});

router.delete(
  "/delete-post/:postId",
  validator.params(paramValidation),
  async (req, res, next) => {
    const { postId } = req.params;
    post = await Post.deleteOne({ _id: postId });
    res.send("Deleted Successfull");
  }
);

module.exports = router;
