import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";


type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, userId: string, userRole: string) => void;
  logout: () => void;
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate()
  const login = (token: string, userId: string, userRole: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", userRole);
    setIsLoggedIn(true);
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate('/')
    
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};