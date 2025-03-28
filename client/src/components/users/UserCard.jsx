import React from "react";

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm font-medium mt-2">Role: {user.role}</p>
      <button
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => onDelete(user._id, localStorage.getItem("token"))}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
