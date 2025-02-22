import { useEffect, useState } from "react";
import { adminfetchPosts, approvePostStatus } from "../../api/admin";
import { format } from "date-fns";
import { Post } from "../../types";

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    adminfetchPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error(err));
  };

  const handleTogglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      setLoading(postId);
      await approvePostStatus(postId, !currentStatus); // Toggle status
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, published: !currentStatus } : post
        )
      );
    } catch (error) {
      console.error("Failed to toggle post status", error);
    } finally {
      setLoading(null);
    }
  };
 const handleTimeFormat = (date:string) =>{
   return format(new Date(date),` eeee dd/MM/yyyy 'at' hh:mm aaa`)
 }
  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Manage Posts</h2>
      <ul className="space-y-2 dark:bg-gray-700">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="p-2 border rounded flex justify-between items-center">
              <span className="w-96">
                {post.title} (by {post.author.firstName} {post.author.lastName}) -{" "}
                {post.published ? "Published" : "Unpublished"}
              </span>
              <p>{handleTimeFormat(post.createdAt)}</p>
              <button
                onClick={() => handleTogglePublish(post.id, post.published)}
                className={`px-3 py-1 rounded transition ${
                  post.published
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                disabled={loading === post.id}
              >
                {loading === post.id
                  ? "Updating..."
                  : post.published
                  ? "Unpublish"
                  : "Publish"}
              </button> 
             
            </li>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPosts;
