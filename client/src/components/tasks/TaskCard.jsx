import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { updateTaskStatus } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await updateTaskStatus(task._id, newStatus, token);
      onStatusChange(task._id, newStatus); // Notify parent component to update UI
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg " >
      <h3 className="font-bold text-lg">
        <Link to={`/dashboard/detail/${task._id}`}>{task.title} </Link>

      </h3>
      <p>{task.description}</p>
      {user.role == "host" ? <p>Assigned to: {task.assignedTo?.name}</p> : ''}
      <p>{task.assignedTo?.email}</p>
      <p className="text-sm text-gray-500">
        Deadline: {new Date(task.deadline).toLocaleDateString()}
      </p>
      {user.role === "host" ? <p className="text-sm text-gray-500">
        Status: {task.status}
      </p> : ''}

      {/* Action Buttons */}

      {user.role === "host" ? <div className="mt-2">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
        <Link
          to={`edit/${task._id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>
      </div> :

        <div className="mt-2">
          <label className="block text-sm font-semibold">Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className={`border px-2 p-1 rounded text-stone-950 ${status === "Completed" ? "bg-green-200" : "bg-orange-300"
              }`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>}

    </div>
  );
};

export default TaskCard;
