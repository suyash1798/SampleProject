const Post = require("../models/post");
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");

const addPost = async (req, res, next) => {
    const newPost = req.body;
    post = await Post.create({ ...newPost, user: req.user._id });
    // console.log(req.user);
    res.send(post);
  }
  
const updatePost =  async (req, res, next) => {
    const newPost = req.body;
    const { postId } = req.params;
    post = await Post.updateOne({ _id: postId }, newPost);
    post = await Post.findOne({ _id: postId });
    res.send(post);
  }
  
const getAllPosts =  async (req, res, next) => {
    const posts = await Post.find({ user: req.user._id });
    res.send(posts);
  }
  
const getPost = async (req, res, next) => {
    const { postId } = req.params;
    post = await Post.deleteOne({ _id: postId });
    res.send("Deleted Successfull");
  }  
    
module.exports = {addPost,updatePost,getAllPosts,getPost}  