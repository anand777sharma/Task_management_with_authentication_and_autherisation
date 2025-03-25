import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import HostDashboard from "../pages/dashboard/HostDashboard";
import MemberDashboard from "../pages/dashboard/MemberDashboard";
import CreateTask from "../pages/tasks/CreateTaskPage";
import ViewTasks from "../pages/tasks/ViewTasksPage";
// import EditTask from "../pages/tasks/EditTaskPage";
import CreateUser from "../pages/users/CreateTeamMemberPage";
import ViewUsers from "../pages/users/ViewTeamMembersPage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard/host",
    element: (
      <ProtectedRoute>
        <HostDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/member",
    element: (
      <ProtectedRoute>
        <MemberDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks/create",
    element: (
      <ProtectedRoute role="host">
        <CreateTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks",
    element: (
      <ProtectedRoute>
        <ViewTasks />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/tasks/edit/:id",
  //   element: (
  //     <ProtectedRoute role="host">
  //       <EditTask />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/users/create",
    element: (
      <ProtectedRoute role="host">
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute role="host">
        <ViewUsers />
      </ProtectedRoute>
    ),
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
