import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/index";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    type User = {
        firstName: string;
        lastName : string;
        
    }
    const [user, setUser] = useState<User>();
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
        <div>
            <h1>Welcome to Home</h1>
            {user ? (
                <div>
                    <button onClick={()=> navigate('/profile/:id/change-password')}> Change Password</button>
                    <h2>{user.firstName} {user.lastName}</h2>
                    
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Home;
