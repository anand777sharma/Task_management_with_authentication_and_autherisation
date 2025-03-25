import { createContext, useState, useEffect } from "react";
import api from "../services/api"; // API service for handling authentication requests

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored token/user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email, password, navigate) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      
      setUser(user);
      setIsAuthenticated(true);
      
      navigate(user.role === "host" ? "/dashboard/host" : "/dashboard/member");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  // Register function
  const register = async (name, email, password, role, navigate) => {
    try {
      const response = await api.post("/auth/register", { name, email, password, role });
      console.log(response);
      
      await login(email, password, navigate); // Automatically log in after successful registration
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  // Logout function
  // const logout = (navigate) => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
    
  //   setUser(null);
  //   setIsAuthenticated(false);
    
  //   navigate("/login");
  // };

  const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    setUser(null);
    setIsAuthenticated(false);
  
    navigate("/login", { replace: true });
  };
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



// import { createContext, useState, useEffect } from "react";
// import api from "../services/api"; // API service for authentication requests

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // New loading state

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }
//     setLoading(false); // Mark as finished loading
//   }, []);

//   const login = async (email, password, navigate) => {
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       const { user, token } = response.data;
      
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
      
//       setUser(user);
//       setIsAuthenticated(true);
      
//       navigate(user.role === "host" ? "/dashboard/host" : "/dashboard/member");
//     } catch (error) {
//       console.error("Login failed:", error.response?.data?.message || error.message);
//     }
//   };

//   const logout = (navigate) => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");

//     setUser(null);
//     setIsAuthenticated(false);

//     navigate("/login", { replace: true });
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Prevents redirect issues while checking auth state
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
