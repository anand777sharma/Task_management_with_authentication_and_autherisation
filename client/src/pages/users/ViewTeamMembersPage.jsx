import { useEffect, useState } from "react";
import { getAllTeamMembers, deleteTeamMember } from "../../services/api";
import UserList from "../../components/users/UserList";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (userId, token) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteTeamMember(userId, token);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [handleDelete]);
  const token = localStorage.getItem("token");


  const fetchUsers = async () => {
    try {
      const response = await getAllTeamMembers(token);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Team Members</h1>
      <div className="bg-white p-4 rounded shadow mt-4">
        <UserList users={users} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ViewUsers;
