import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Unauthorized Access</h1>
      <p className="text-gray-600">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="text-blue-500 mt-4">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
