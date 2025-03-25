import { useContext } from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <RegisterForm register={register} />
      </div>
    </div>
  );
};

export default RegisterPage;
