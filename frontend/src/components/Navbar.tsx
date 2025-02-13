import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <div className="flex flex-row justify-between items-center bg-gray-800 p-4">
            <div className="flex flex-row items-center">
                <span className="text-white font-bold text-lg">Blog</span>
            </div>
            <div className="flex flex-row items-center space-x-4">
                <button className="text-white font-bold text-lg" onClick={() => navigate('/')}>
                    Home
                </button>

                {isLoggedIn ? (
                    // If user is logged in, show "Logout" button
                    <button className="text-white font-bold text-lg" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    // If not logged in, show "Signin" and "Signup" buttons
                    <>
                        <button className="text-white font-bold text-lg" onClick={() => navigate('/signin')}>
                            Signin
                        </button>
                        <button className="text-white font-bold text-lg" onClick={() => navigate('/signup')}>
                            Signup
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
