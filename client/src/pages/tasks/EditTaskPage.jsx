// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getTaskById, updateTask, getAllTeamMembers } from "../../services/api";

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     assignedTo: "",
//     deadline: "",
//     status: "",
//   });
//   const [users, setUsers] = useState([]); // State for team members
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchTask();
//     fetchUsers();
//   }, []);

//   // Fetch Task Details
//   const fetchTask = async () => {
//     try {
//       const response = await getTaskById(token, id);
//       setTask(response.data);
//     } catch (error) {
//       console.error("Error fetching task:", error);
//     }
//   };

//   // Fetch Users (Team Members)
//   const fetchUsers = async () => {
//     try {
//       const response = await getAllTeamMembers(token);
//       setUsers(response.data); // Assuming response.data contains an array of users
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   // Handle User Selection
//   const handleUserSelect = (e) => {
//     setTask({ ...task, assignedTo: e.target.value });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateTask(id, task, token);
//       alert("Task updated successfully!");
//       navigate("/dashboard/tasks"); // Redirect after update
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Edit Task</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
//         <input 
//           type="text" 
//           name="title" 
//           value={task.title} 
//           onChange={handleChange} 
//           className="border p-2 w-full mb-2" 
//           required 
//         />
//         <textarea 
//           name="description" 
//           value={task.description} 
//           onChange={handleChange} 
//           className="border p-2 w-full mb-2" 
//           required 
//         />
        
//         {/* User Selection Dropdown */}
//         <select 
//           name="assignedTo" 
//           value={task.assignedTo} 
//           onChange={handleUserSelect} 
//           className="border p-2 w-full mb-2"
//           required
//         >
//           <option value="">Select a Team Member</option>
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.name} ({user.email})
//             </option>
//           ))}
//         </select>

//         <input 
//           type="date" 
//           name="deadline" 
//           value={task.deadline} 
//           onChange={handleChange} 
//           className="border p-2 w-full mb-2" 
//           required 
//         />

//         <select 
//           name="status" 
//           value={task.status} 
//           onChange={handleChange} 
//           className="border p-2 w-full mb-2"
//         >
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>

//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//           Update Task
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditTask;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask, getAllTeamMembers } from "../../services/api";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: "",
  });
  const [users, setUsers] = useState([]); // State for team members
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchTask();
  }, []);

  // Fetch Users (Team Members)
  const fetchUsers = async () => {
    try {
      const response = await getAllTeamMembers(token);
      setUsers(response.data); // Assuming response.data contains an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Task Details
  const fetchTask = async () => {
    try {
      const response = await getTaskById(token, id);
      if (response.data) {
        const taskData = response.data;
        // Ensure deadline format is correct for input type="date"
        if (taskData.deadline) {
          taskData.deadline = new Date(taskData.deadline).toISOString().split("T")[0];
        }
        setTask(taskData);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle User Selection
  const handleUserSelect = (e) => {
    setTask({ ...task, assignedTo: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task, token);
      alert("Task updated successfully!");
      navigate("/dashboard/tasks"); // Redirect after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
        <input 
          type="text" 
          name="title" 
          value={task.title} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2" 
          required 
        />
        <textarea 
          name="description" 
          value={task.description} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2" 
          required 
        />
        
        {/* User Selection Dropdown with Default Selection */}
        <select 
          name="assignedTo" 
          value={task.assignedTo || ""} 
          onChange={handleUserSelect} 
          className="border p-2 w-full mb-2"
          required
        >
          <option value="">Select a Team Member</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        {/* Default Deadline in Proper Date Format */}
        <input 
          type="date" 
          name="deadline" 
          value={task.deadline || ""} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2" 
          required 
        />

        <select 
          name="status" 
          value={task.status || "Pending"} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
