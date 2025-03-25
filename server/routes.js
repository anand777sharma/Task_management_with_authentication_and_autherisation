import express from "express";
import { registerUser, loginUser, getUserProfile } from "./controllers/authController.js";
import { 
  createTeamMember, 
  getAllTeamMembers, 
  deleteTeamMember 
} from "./controllers/userController.js";
import { 
  createTask, 
  getAllTasks, 
  updateTask, 
  deleteTask, 
  getUserTasks, 
  updateTaskStatus, 
  getTaskById
} from "./controllers/taskController.js";

import { authenticateUser, authorizeHost, authorizeMember } from "./middleware/authMiddleware.js";

const router = express.Router();

// Authentication & User Management
router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", loginUser);
router.get("/api/auth/profile", authenticateUser, getUserProfile);

// Admin (Host) Actions
router.post("/api/users/create", authenticateUser, authorizeHost, createTeamMember);
router.get("/api/users", authenticateUser, authorizeHost, getAllTeamMembers);
router.delete("/api/users/:id", authenticateUser, authorizeHost, deleteTeamMember);

// Task Management (Host)
router.post("/api/tasks/create", authenticateUser, authorizeHost, createTask);
router.get("/api/tasks", authenticateUser, authorizeHost, getAllTasks);
router.put("/api/tasks/:id", authenticateUser, authorizeHost, updateTask);
router.delete("/api/tasks/:id", authenticateUser, authorizeHost, deleteTask);


router.get("/api/task/:id", authenticateUser, getTaskById);

// Task Management (Team Member)
router.get("/api/tasks/assigned", authenticateUser, authorizeMember, getUserTasks);
router.put("/api/tasks/:id/status", authenticateUser, authorizeMember, updateTaskStatus);

export default router;
