// import { useEffect, useState } from "react";
// import { deleteTask, getAllTasks } from "../../services/api";
// import TaskList from "../../components/tasks/TaskList";

// const ViewTasks = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);
// console.log(tasks);

//   const token = localStorage.getItem("token");

//   const fetchTasks = async () => {
//     try {
//       const response = await getAllTasks(token);
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await deleteTask(taskId, token);
//       setTasks(tasks.filter(task => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };
//   const handleUpdate = async (taskId) => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await updateTask(taskId, taskData, token);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">All Tasks</h1>
//       <div className="bg-white p-4 rounded shadow mt-4">
//         <TaskList tasks={tasks} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// };

// export default ViewTasks;


import { useEffect, useState } from "react";
import { deleteTask, getAllTasks, updateTask } from "../../services/api";
import TaskList from "../../components/tasks/TaskList";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (taskId, updatedTask) => {
    try {
      await updateTask(taskId, updatedTask, token);
      setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">All Tasks</h1>
      <div className="bg-white p-4 rounded shadow mt-4">
        <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ViewTasks;
