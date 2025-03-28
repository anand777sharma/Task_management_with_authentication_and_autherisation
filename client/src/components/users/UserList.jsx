import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;
