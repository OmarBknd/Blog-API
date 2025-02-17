import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postGetById, postDelete } from "../../api/post";
import CommentCreate from "../comments-management/CommentCreate";
import CommentDelete from "../comments-management/CommentDelete";
import CommentUpdate from "../comments-management/CommentUpdate";
import PostDelete from "./PostDelete";
import { Post, Comment } from "../../types";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Fetch the post data
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const data = await postGetById(postId);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handlePostDelete = async () => {
    if (!postId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await postDelete(postId);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post.");
    }
  };

  const handleCommentDelete = (commentId: string) => {
    if (!post) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    setPost({
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    });
  };

  if (loading) return <p className="text-center text-gray-600">Loading post...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed mt-4">{post.content}</p>

     
      {userId === post.author.id && (
        <div className="mt-4 flex space-x-3">
          <button
            className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            onClick={() => navigate(`/post/update/${postId}`)}
          >
            Edit Post
          </button>
          <PostDelete postId={post.id} onDelete={handlePostDelete} />
        </div>
      )}

      
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Comments</h4>
        {post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment: Comment) => (
              <li key={comment.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-xs text-gray-500">
                  - {comment.author.firstName} {comment.author.lastName}
                </span>

                
                {userId === comment.author.id && (
                  <div className="mt-2 flex space-x-2">
                    <CommentDelete commentId={comment.id} onDelete={() => handleCommentDelete(comment.id)} />
                    <CommentUpdate
                      commentId={comment.id}
                      initialContent={comment.content}
                      onUpdate={(updatedContent) => {
                        setPost({
                          ...post,
                          comments: post.comments.map((c) =>
                            c.id === comment.id ? { ...c, content: updatedContent } : c
                          ),
                        });
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      
      <div className="mt-6">
        <CommentCreate postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetail;
