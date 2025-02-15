import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userId = localStorage.getItem('userId');

    // Check if user is logged in when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="flex flex-row justify-between items-center bg-gray-900 p-4 shadow-lg">
            <div className="flex flex-row items-center">
                <span className="text-white font-bold text-2xl cursor-pointer" onClick={() => navigate('/')}>
                    Blog
                </span>
            </div>
            <div className="flex flex-row items-center space-x-6">
                <button 
                    className="text-white font-semibold text-lg hover:text-gray-300 transition duration-300" 
                    onClick={() => navigate('/')}
                >
                    Home
                </button>

                {isLoggedIn ? (
                    // If user is logged in, show "Logout" and "Profile" buttons
                    <div className="flex flex-row items-center space-x-6">
                        <button 
                            className="text-white font-semibold text-lg hover:text-gray-300 transition duration-300" 
                            onClick={() => navigate(`/profile/${userId}`)}
                        >
                            Profile
                        </button>
                        <button 
                            className="text-white font-semibold text-lg hover:text-red-500 transition duration-300" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // If not logged in, show "Signin" and "Signup" buttons
                    <div className="flex flex-row items-center space-x-6">
                        <button 
                            className="text-white font-semibold text-lg hover:text-gray-300 transition duration-300" 
                            onClick={() => navigate('/signin')}
                        >
                            Signin
                        </button>
                        <button 
                            className="text-white font-semibold text-lg hover:text-gray-300 transition duration-300" 
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;