import {PostList} from '../components/posts'
import { getProfile } from '../api';
import { useEffect, useState } from 'react';
const Home = () => {

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
        <PostList/>
        </>
        
    )
}

export default Home