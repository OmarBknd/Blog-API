import { useEffect, useState } from "react";
import { adminfetchPosts, approvePostStatus } from "../../api/admin";

type Post = {
  id: string;
  title: string;
  published: boolean;
  author: { firstName: string; lastName: string };
};

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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Posts</h2>
      <ul className="space-y-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="p-2 border rounded flex justify-between items-center">
              <span>
                {post.title} (by {post.author.firstName} {post.author.lastName}) -{" "}
                {post.published ? "Published" : "Unpublished"}
              </span>
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
