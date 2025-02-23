import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./DarkTheme";
import { Sun, Moon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const userId = localStorage.getItem("userId");

  // Theme Toggle
  const DarkThemeToggle = useContext(ThemeContext);
  if (!DarkThemeToggle) return null;

  return (
    <nav className="bg-gray-950 p-4 shadow-lg">
      <div className=" mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-6">
          <span
            className="text-white font-bold text-2xl cursor-pointer hover:text-indigo-400 transition"
            onClick={() => navigate("/")}
          >
            Blog
          </span>
          <button
            onClick={DarkThemeToggle.toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white
              hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2"
          >
            {DarkThemeToggle.theme === "dark" ? (
              <Sun className="size-5 text-yellow-400" />
            ) : (
              <Moon className="size-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        
        <div className="flex items-center space-x-6">
          <button
            className="text-white font-semibold text-lg hover:text-indigo-400 transition duration-300"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          {isLoggedIn ? (
            <button
              className="text-white font-semibold text-lg hover:text-indigo-400 transition duration-300"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              Profile
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                className="text-white font-semibold text-lg hover:text-indigo-400 transition duration-300"
                onClick={() => navigate("/signin")}
              >
                Signin
              </button>
              <button
                className="text-white font-semibold text-lg px-4 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
