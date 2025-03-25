import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to authenticate user using JWT
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
   
    
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
    if (!req.user) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// Middleware to authorize only "host" users
export const authorizeHost = (req, res, next) => {
  if (req.user && req.user.role === "host") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: Only hosts can perform this action" });
  }
};

// Middleware to authorize only "member" users
export const authorizeMember = (req, res, next) => {
  if (req.user && req.user.role === "member") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: Only team members can perform this action" });
  }
};
