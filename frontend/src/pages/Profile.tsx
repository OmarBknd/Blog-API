import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../api";
import { postGetByUserId } from "../api/post";
import { usePost } from "../hooks/usePost";
import PostCard from "../components/posts-management/PostCard";
import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { useAuth } from "../hooks/useAuth";


const Profile = () => {

  const {logout} = useAuth()
  const navigate = useNavigate();
  const { id } = useParams();

  type User = { firstName: string; lastName: string };
  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("token")
  const userRole = localStorage.getItem("userRole");
  // Fetch user posts
  const { posts: userPosts } = usePost(() => postGetByUserId(id!));

  // Fetch user profile
  useEffect(() => {
    if (!id) return;
    const fetchUserData = async () => {
      try {
        const profileData = await getProfile(id);
        setUser(profileData.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (!userId) {
      logout();
      navigate("/signin"); 
    }
  }, [userId, logout, navigate]);
  

  return (
    <div className=" dark:bg-gray-900">
      {user ? (
       <div className="flex gap-1 m-2 justify-between">
        <h2 className=" font-bold text-gray-400 mb-3">
         {user.firstName} {user.lastName}
       </h2>
     
      
       <details className="relative inline-block">
         <summary className=" cursor-pointer list-none">
           
           <List/>
         </summary>
        
         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
         {userRole === "ADMIN" && (
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              onClick={() => navigate(`/admin-dashboard`)}
            >
              Admin dashboard
            </button>
          )}
           <button
             className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
             onClick={() => navigate(`/profile/${id}/change-password`)}
           >
             Change Password
           </button>
           <button
             className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
             onClick={logout}
           >
             Log out
           </button>
         </div>
       </details>
      
     </div>
      ) : (
        <p className="text-white text-lg font-semibold">Loading user data...</p>
      )}

      <div className=" w-full  flex flex-col items-center
      p-6 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300
      ">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Posts</h2>
        {userPosts.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPosts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-lg text-center">No posts yet.</p>
          
        )}
      </div>
    </div>
  );
};

export default Profile;
