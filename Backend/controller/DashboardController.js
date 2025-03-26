const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const totalPosts = await Post.countDocuments({ userId });

    // Aggregation query corrected for numeric `likes`
    const totalLikesResult = await Post.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } }, // Summing directly
    ]);

    const totalLikes = totalLikesResult.length > 0 ? totalLikesResult[0].totalLikes : 0;
    const totalComments = await Comment.countDocuments({ userId });

    res.status(200).json({
      message: "User Dashboard Data",
      totalPosts,
      totalLikes,
      totalComments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();

    const mostActiveUsers = await Post.aggregate([
      { $group: { _id: "$userId", postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { _id: 0, username: "$user.username", postCount: 1 } },
    ]);

    res.status(200).json({
      message: "Admin Dashboard Data",
      totalUsers,
      totalPosts,
      mostActiveUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
