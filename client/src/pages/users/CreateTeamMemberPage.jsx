import { useState } from "react";
import { createTeamMember } from "../../services/api";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "member",
    password: "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTeamMember(user,token);
      alert("User created successfully!");
      setUser({ name: "", email: "", role: "member", password: "" });
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Team Member</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full mb-2" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full mb-2" required />
        <select name="role" value={user.role} onChange={handleChange} className="border p-2 w-full mb-2">
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
