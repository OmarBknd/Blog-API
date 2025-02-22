import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tinymce from "../Tinymce";
import { postUpdate, postGetByUserId } from "../../api/post";
import { Post } from "../../types";
import toast from "react-hot-toast";

const PostUpdate = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        if (!userId) {
          toast.error("User not authenticated.");
          return;
        }

        const userPosts = await postGetByUserId(userId);
        if (!userPosts) {
          toast.error("Error fetching user posts.");
          return;
        }

        const foundPost = userPosts.posts?.find((p: Post) => p.id === postId);
        if (!foundPost) {
          toast.error("Post not found.");
          return;
        }

        setTitle(foundPost.title);
        setContent(foundPost.content);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load the post.");
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
        toast.error("Failed to update post.");
        return;
      }
      toast.success("Post updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post.");
    }
  };

  if (loading) return <p>Loading post...</p>;

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
     
    </div>
  );
};

export default PostUpdate;
