const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token!" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access Denied! Admins only." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
