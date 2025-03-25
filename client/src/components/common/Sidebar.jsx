import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; 

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const [openSections, setOpenSections] = useState({
    userManagement: false,
    taskManagement: false,
    tracking: false,
    notifications: false,
    settings: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 max-h-screen sticky top-0">
      <ul>
        <li className="mb-4 font-semibold text-gray-400">
          <Link to="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link>
        </li>
        { }

        {user?.role === "host" ? (
          <>
           
            <li className="mb-4 font-semibold text-gray-400 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("userManagement")}>
              User Management {openSections.userManagement ? <FaChevronDown /> : <FaChevronRight />}
            </li>
            {openSections.userManagement && (
              <ul className="ml-4">
                <li className="mb-2">
                  <Link to="users" className="block p-2 hover:bg-gray-700">Manage Team</Link>
                </li>
                <li className="mb-2">
                  <Link to="users/create" className="block p-2 hover:bg-gray-700">Add Team Member</Link>
                </li>
              </ul>
            )}

            {/* Task Management */}
            <li className="mb-4 font-semibold text-gray-400 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("taskManagement")}>
              Task Management {openSections.taskManagement ? <FaChevronDown /> : <FaChevronRight />}
            </li>
            {openSections.taskManagement && (
              <ul className="ml-4">
                <li className="mb-2">
                  <Link to="tasks/create" className="block p-2 hover:bg-gray-700">Create Tasks</Link>
                </li>

                <li className="mb-2">
                  <Link to="tasks" className="block p-2 hover:bg-gray-700">All Tasks</Link>
                </li>
              </ul>
            )}   

          </>
        ) : <>

          <li className="mb-4 font-semibold text-gray-400">
            <Link to="profile" className="block p-2 hover:bg-gray-700">Profile</Link>
          </li>
          <li className="mb-4 font-semibold text-gray-400">
            <Link to="my_tasks" className="block p-2 hover:bg-gray-700">Assigned Tasks</Link>
          </li>
        </>}
      </ul>
    </aside>
  );
};

export default Sidebar;
