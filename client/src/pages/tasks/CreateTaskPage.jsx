// import { useState } from "react";
// import { createTask } from "../../services/api";

// const CreateTask = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     assignedTo: "",
//     deadline: "",
//     status: "Pending",
//   });
//   const token = localStorage.getItem("token");

//   const fetchUsers = async () => {
//     try {
//       const response = await getAllTeamMembers(token);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createTask(task);
//       alert("Task created successfully!");
//       setTask({ title: "", description: "", assignedTo: "", deadline: "", status: "Pending" });
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Create Task</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
//         <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Task Title" className="border p-2 w-full mb-2" required />
//         <textarea name="description" value={task.description} onChange={handleChange} placeholder="Task Description" className="border p-2 w-full mb-2" required />
//         <input type="text" name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Assign to (User ID)" className="border p-2 w-full mb-2" required />
//         <input type="date" name="deadline" value={task.deadline} onChange={handleChange} className="border p-2 w-full mb-2" required />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
//       </form>
//     </div>
//   );
// };

// export default CreateTask;


import { useState, useEffect } from "react";
import { createTask, getAllTeamMembers } from "../../services/api";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: "Pending",
  });

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllTeamMembers(token);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUserSelect = (e) => {
    setTask({ ...task, assignedTo: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(task, token);
      alert("Task created successfully!");
      setTask({ title: "", description: "", assignedTo: "", deadline: "", status: "Pending" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="border p-2 w-full mb-2"
          required
        />
        
        {/* Dropdown to select user */}
        <select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleUserSelect}
          className="border p-2 w-full mb-2"
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
