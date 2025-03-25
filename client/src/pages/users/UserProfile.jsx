import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className=" p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          User Profile
        </h2>

        {profile ? (
          <div className="text-gray-600 space-y-2">
            <p><span className="font-semibold">Name:</span> {profile.name}</p>
            <p><span className="font-semibold">Email:</span> {profile.email}</p>
            <p>
              <span className="font-semibold">Role:</span>  &nbsp;
              <span className={`ml-2 px-2 py-1 rounded text-white ${profile.role === "admin" ? "bg-green-500" : "bg-blue-500"}`}>
                {profile.role}
              </span>
            </p>
            <p>
              <span className="font-semibold">Team:</span> 
              {profile.teamId ? profile.teamId : "No Team"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
