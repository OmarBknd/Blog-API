import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../api";
import { postGetByUserId } from "../api/post";
import { usePost } from "../hooks/usePost";
import PostCard from "../components/posts-management/PostCard";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  

  type User = { firstName: string; lastName: string };
  const [user, setUser] = useState<User | null>(null);

 
  const { posts: userPosts, handleCommentDelete, handlePostDelete } = usePost(() =>
    postGetByUserId(id!)
  );

 
  useEffect(() => {
    console.log("User Posts:", userPosts);
  }, [userPosts]);

 
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      {user ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 max-w-lg w-full text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 mb-6">Welcome back! Here are your posts.</p>
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

      <div className="max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Posts</h2>
        {userPosts.length > 0 ? (
          <ul className="space-y-8">
            {userPosts.map((post) => (
              <li key={post.id}>
                <PostCard
                  post={post}
                  onCommentDelete={handleCommentDelete}
                  onPostDelete={handlePostDelete}
                />
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