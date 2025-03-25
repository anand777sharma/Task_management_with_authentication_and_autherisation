import { useEffect, useState } from "react";
import { getAllTasks, getAllTeamMembers } from "../../services/api";

const HostDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchTasks();
    fetchTeamMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await getAllTeamMembers(token);
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Host Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Tasks Overview :{tasks.length}</h2>

        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Team Members{teamMembers.length} </h2>

        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
