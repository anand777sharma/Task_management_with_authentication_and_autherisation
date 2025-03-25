import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Create a new team member (Host only)
export const createTeamMember = async (req, res) => {
  try {
    const { name, email, password, teamId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create team member
    const newMember = new User({
      name,
      email,
      password: hashedPassword,
      role: "member",
      teamId,
    });

    await newMember.save();
    res.status(201).json({ message: "Team member created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all team members (Host only)
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await User.find({ role: "member" }).select("-password"); // Exclude password from response
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a team member (Host only)
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
