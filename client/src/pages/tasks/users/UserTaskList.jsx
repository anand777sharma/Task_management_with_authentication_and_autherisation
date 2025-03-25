import React, { useEffect, useState } from 'react'
import { getUserTasks } from '../../../services/api';
import TaskList from '../../../components/tasks/TaskList';

const UserTaskList = () => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetchUserTasks();
    }, []);

    const fetchUserTasks = async () => {
        try {
            const response = await getUserTasks(token); // API call for assigned tasks
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    return (
        <div className='p-2 sm:p-6' >
            <h2 className="text-xl font-semibold mb-3">My Tasks</h2>
            {tasks.length ? <TaskList tasks={tasks} /> : "No task found"}
        </div>
    )
}

export default UserTaskList