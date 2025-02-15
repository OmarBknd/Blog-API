import { useState } from "react";
import { changeUserPassword } from "../api";

const PasswordChange = () => {
    const [password, setPassword] = useState("");
    const userId = localStorage.getItem("userId"); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!userId) {
            alert("User not logged in.");
            return;
        }

        try {
           await changeUserPassword(userId, password)
           alert('Password changed successfully!');
           setPassword('');
        } catch (error) {
            console.error("Error:", error);
            alert("Error updating password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Change Password
            </button>
        </form>
    );
};

export default PasswordChange;