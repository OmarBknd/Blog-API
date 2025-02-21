import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpFetch from '../api/signUp';

const SignUp = () => {
  const navigate = useNavigate();

  type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signUpFetch(formData);
      console.log('Signup successful:', response);
      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup failed:', error);
        alert(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold dark:text-white mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 dark:bg-gray-700 border border-gray-600 rounded-md dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 dark:bg-gray-700 border border-gray-600 rounded-md dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 dark:bg-gray-700 border border-gray-600 rounded-md dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 dark:bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate('/signin')}
            className="text-blue-500 hover:text-blue-400 transition duration-300"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;