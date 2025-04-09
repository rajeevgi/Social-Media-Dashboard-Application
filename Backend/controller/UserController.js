const User = require("../models/User");
const bcrypt = require("bcrypt");

// Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Users not found!" });
    }
    res.status(201).json({ message: "List of Users are :", users });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Admin or User Profile when Logged In.
exports.getMyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    if (!getUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(201).json({ mesaage: "The User's profile is :", getUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Get User Profile by using username.
exports.getUserProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username : username });

    if(!user){
      return res.status(404).json({ message : "User not found!" });
    }

    res.status(200).json({ message : "User Profile found", user });
  } catch (error) {
     return res.status(500).json({ message : "Internal Server Error!" }); 
  }
};

// Admin or User Data Update.
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If password is being updated, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res
      .status(201)
      .json({ message: "User Updated Successfully...", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Admin only
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(201)
      .json({ message: "User Deleted Successfully...", deletedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
