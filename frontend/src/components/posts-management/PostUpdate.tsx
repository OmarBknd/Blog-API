import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tinymce from "../Tinymce";
import { postUpdate, postGetByUserId } from "../../api/post";
import { Post } from "../../types";

const PostUpdate = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        if (!userId) {
          setError("User not authenticated.");
          return;
        }

        const userPosts = await postGetByUserId(userId);
        if (!userPosts) {
          setError("Error fetching user posts.");
          return;
        }

        const foundPost = userPosts.posts?.find((p: Post) => p.id === postId);
        if (!foundPost) {
          setError("Post not found.");
          return;
        }

        setTitle(foundPost.title);
        setContent(foundPost.content);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;

    try {
      const response = await postUpdate(postId, { title, content });
      if (!response) {
        setError("Failed to update post.");
        return;
      }
      setMessage("Post updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Error updating post.");
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto  shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Your Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Post Title"
          required
        />
        <Tinymce value={content} onChange={setContent} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default PostUpdate;
