import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomeRedirect = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to={user.role === "host" ? "/dashboard/host" : "/dashboard/member"} replace />;
};

export default HomeRedirect