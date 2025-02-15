import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../api/index";

const Profile = () => {
    const navigate = useNavigate();
    
    type User = {
        firstName: string;
        lastName: string;
    };
    
    const [user, setUser] = useState<User | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                const data = await getProfile(id);
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
            {user ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 max-w-lg w-full text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-500 mb-6">Welcome back! Manage your account below.</p>
                    <button
                        className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
                        onClick={() => navigate(`/profile/${id}/change-password`)}
                    >
                        Change Password
                    </button>
                </div>
            ) : (
                <p className="text-white text-lg font-semibold">Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
