import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import Sidebar from "./common/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="overflow-auto sm:max-h-[100vh-80px]">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
