import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import HostDashboard from "./pages/dashboard/HostDashboard";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import CreateTask from "./pages/tasks/CreateTaskPage";
import ViewTasks from "./pages/tasks/ViewTasksPage";
import EditTask from "./pages/tasks/EditTaskPage";
import CreateUser from "./pages/users/CreateTeamMemberPage";
import ViewUsers from "./pages/users/ViewTeamMembersPage";
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout";
import UnauthorizedPage from "./components/common/UnauthorizedPage";
import DashboardRedirect from "./components/common/DashboardRedirect";
import UserTaskList from "./pages/tasks/users/userTaskList";
import UserProfile from "./pages/users/UserProfile";
import TaskDetails from "./components/tasks/TaskDetails";
import HomeRedirect from "./components/common/HomeRedirect";


const router = createBrowserRouter([
  { path: "/", element: <HomeRedirect/> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/dashboard", element: <DashboardRedirect />, 
  },
  {
    path: "/dashboard", element: <Layout />, 
    children: [
      {
        path: "host",
        element: (
          <ProtectedRoute requiredRole="host">
            <HostDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "member",
        element: (
          <ProtectedRoute requiredRole="member">
            <MemberDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/create",
        element: (
          <ProtectedRoute requiredRole="host">
            <CreateUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute requiredRole="host">
            <ViewUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/create",
        element: (
          <ProtectedRoute requiredRole="host">
            <CreateTask />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks",
        element: (
          <ProtectedRoute requiredRole="host">
            <ViewTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "my_tasks",
        element: (
          <ProtectedRoute requiredRole="member">
            <UserTaskList />
          </ProtectedRoute>
        ),
      },
      {
        path: "detail/:id",
        element: (
          <ProtectedRoute >
            <TaskDetails />
           </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole="member">
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/edit/:id",
        element: (
          <ProtectedRoute requiredRole="host">
            <EditTask />
          </ProtectedRoute>
        ),
      },
    ],
  },

]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
