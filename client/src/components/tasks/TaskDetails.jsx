import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../../services/api";

const TaskDetails = () => {
  const [task, setTask] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(id);
  
  useEffect(() => {
    fetchTasksDetails();
  }, []);

  const fetchTasksDetails = async () => {
    try {
      const response = await getTaskById(token, id);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="font-bold text-2xl">{task.title}</h2>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p className={`text-sm font-semibold ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
        Status: {task.status}
      </p>
    </div>
  );
};

export default TaskDetails;