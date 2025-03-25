import Task from "../models/Task.js";
import User from "../models/User.js";

// Create a new task (Host only)
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;

    // Check if assigned user exists and is a team member
    const user = await User.findById(assignedTo);
    if (!user || user.role !== "member") {
      return res.status(400).json({ message: "Invalid team member ID" });
    }

    // Create task
    const newTask = new Task({
      title,
      description,
      assignedTo,
      deadline,
      status: "Pending",
      createdBy: req.user.id, // Host ID from middleware
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all tasks (Host only)
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate("assignedTo", "name email");
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update a task (Host only)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, deadline, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, deadline, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a task (Host only)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get tasks assigned to a specific user (Team Member)
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });
    // console.log(tasks);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update task status (Team Member)
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ _id: id, assignedTo: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
