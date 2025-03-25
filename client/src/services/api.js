import axios from "axios";

const API_URL = import.meta.VITE_REACT_APP_API_URL || "http://localhost:5000/api";

// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const getUserProfile = (token) =>
  api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

// User Management APIs (Admin Only)
export const createTeamMember = (userData, token) =>
  api.post("/users/create", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllTeamMembers = (token) =>
  api.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTeamMember = (userId, token) =>
  api.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Task Management APIs (Admin)
export const createTask = (taskData, token) =>
  api.post("/tasks/create", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllTasks = (token) =>
  api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  
export const getTaskById = (token,id) =>
  api.get(`/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (taskId, taskData, token) =>
  api.put(`/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (taskId, token) =>
  api.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Task Management APIs (Team Member)
export const getUserTasks = (token) =>
  api.get("/tasks/assigned", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTaskStatus = (taskId, status, token) =>
  api.put(
    `/tasks/${taskId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export default api;
