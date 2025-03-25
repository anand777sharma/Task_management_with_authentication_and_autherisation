import { useEffect, useState } from "react";
import { getUserTasks } from "../../services/api";
import TaskList from "../../components/tasks/TaskList";

const MemberDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const response = await getUserTasks(token); // API call for assigned tasks

      //  console.log(response);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Member Dashboard</h1>
      <div className=" p-4 rounded shadow mt-4 flex flex-wrap ">
        <h2 className="text-xl font-semibold mb-3">Total Tasks {tasks.length}</h2>
      </div>
    </div>
  );
};

export default MemberDashboard;
