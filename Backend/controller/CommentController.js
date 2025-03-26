const Comment = require("../models/Comment");

// Add Comment On Post
exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content not found!" });
    }
    const newComment = await Comment.create({
      userId: req.user.id,
      postId,
      content,
    });

    res.status(200).json({ message: "commented on post.", newComment });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Delete Comments from an post
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    // Check owner of the comment before deleting the comment
    if (comment.userId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete the comment!" });
    }

    await Comment.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "Comment removed from the post..", comment });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

exports.editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Find the comment by ID
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update comment!" });
    }

    // Update content
    comment.content = content || comment.content;
    await comment.save(); // Save changes to database

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Edit Comment Error: ", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
