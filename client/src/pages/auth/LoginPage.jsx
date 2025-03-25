import { useContext } from "react";
import LoginForm from "../../components/auth/LoginForm";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <LoginForm login={login} />
      </div>
    </div>
  );
};

export default LoginPage;
