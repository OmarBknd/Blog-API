import {PostList} from '../components/PostsList'
import { getProfile } from '../api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
const navigate = useNavigate()
    type User = {
        firstName : string;
        lastName : string;
    }
const [user, setUser] = useState<User | null>(null)
const userId = localStorage.getItem('userId')

useEffect(() => {
    const fetchUser = async () => {
        if (!userId) return;

        try {
            const data = await getProfile(userId);
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    fetchUser();
}, [userId]);

    return(
        <>
        <div>{user && <p>{user.firstName}{user.lastName}</p> }</div>
        <button className="text-white font-bold text-lg" onClick={()=> navigate('/post/create')}>Create post</button>
        <PostList/>
        </>
        
    )
}

export default Home