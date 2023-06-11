import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    userId: null,
  });

  return (
    <AuthContext.Provider value={{ ...authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
