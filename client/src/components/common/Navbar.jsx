import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between sm:sticky sm:top-0">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div>
        {/* <Link to="/" className="mr-4">Home</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link> */}
        <button onClick={() => logout(navigate)} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
