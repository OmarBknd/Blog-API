import  PostList  from "../components/posts-management/PostsList";
import { getProfile } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  type User = {
    firstName: string;
    lastName: string;
  };

  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("userId");

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

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col items-center py-8 px-4">
     
      {user && (
        <div className=" ">
          <p className="text-xl font-semibold dark:text-white ">
            Welcome, {user.firstName} {user.lastName}!
          </p>
        </div>
      )}

     
      <button
        className="bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-500 mb-6"
        onClick={() => navigate("/post/create")}
      >
         Create a New Post
      </button>

      
      
        <PostList />
      
    </div>
  );
};

export default Home;
