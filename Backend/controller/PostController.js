const Post = require("../models/Post");

// It will display All the Posts(Global).
exports.getAllPost = async (req, res) => {
  try {
    const fetchAll = await Post.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    if (fetchAll.length === 0) {
      return res.status(404).json({ message: "No Posts to show!" });
    }
    res.status(201).json({ message: "All Posts are: ", fetchAll });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Get Logged-In User Post
exports.getMyPost = async (req, res) => {
  try {
    const { id } = req.params;
    const myPost = await Post.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    if (!myPost) {
      return res.status(404).json({ message: "Users post not found!" });
    }
    res.status(201).json({ message: "The User's post is :", myPost });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// User will create or upload a new Post.
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = await Post.create({ userId: req.user.id, content });
    if (!newPost) {
      return res.status(404).json({ message: "Something went wrong!" });
    }
    res.status(201).json({ message: "New Post Uploaded...", newPost });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await Post.findById(id);
    if (!getPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (getPost.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Post Updated Successfully...", updatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Delete a Post (Owner or Admin)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await Post.findById(id);
    console.log("Post: ", getPost);
    if(!getPost){
      return res.status(404).json({ message : "Post Not Found!"});
    }

    if(getPost.userId.toString() !== req.user.id && req.user.role !== 'Admin'){
      return res.status(403).json({ message : "Unauthorized!"});
    }

    const deletePost = await Post.findByIdAndDelete(id);
    console.log("Deleted Data: ", deletePost);
    res.status(200).json({ message : "Post Deleted Successfullly", deletePost});
  } catch (error) {
    return res.status(500).json({ message : "Internal Server Error!"});
  }
};



