import signInFetch from "../api/signIn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; 

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  type User = {
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);
    try {
      const response = await signInFetch(formData); // Use the signInFetch function
      if (response.token) {
        // Call the login function from AuthProvider
        login(response.token, response.user.id, response.user.role);
        navigate(`/profile/${response.user.id}`);
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="dark:bg-gray-800 bg-gradient-to-tl from-blue-950 to-gray-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold dark:text-white mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-500 hover:text-indigo-400 transition duration-300"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;