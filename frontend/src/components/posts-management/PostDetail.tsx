import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postGetById } from "../../api/post";
import CommentCreate from "../comments-management/CommentCreate";
import CommentDelete from "../comments-management/CommentDelete";
import CommentUpdate from "../comments-management/CommentUpdate";
import PostDelete from "./PostDelete";
import { Post, Comment } from "../../types";
import { Edit } from "lucide-react";
import  DOMPurify  from "dompurify";
import { formatDistanceToNow } from "date-fns";

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
  

  const handleTimeFormat = (createdAt: string, updatedAt?: string) => {
    if (updatedAt) {
      return `Edited ${formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}`;
    }
    return `Posted ${formatDistanceToNow(new Date(createdAt), { addSuffix: true })}`;
  };
  



  if (loading) return <p className="text-center text-gray-600">Loading post...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!post) return null;

  const sanitizedPostContent = DOMPurify.sanitize(post.content);

  
  return (
    <div className=" max-w-3xl  mx-auto p-6 mt-6 dark:bg-gray-700  dark:text-white rounded-lg shadow-lg">
       {userId === post.author.id && (
        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            className=" flex gap-1 cursor-pointer dark:text-white"
            onClick={() => navigate(`/post/update/${postId}`)}
          >
            <Edit/>
            Edit Post
          </button>
          <PostDelete postId={post.id}  />
        </div>
      )}
      <h2 className="text-3xl font-bold dark:text-white text-gray-900">{post.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed mt-4 dark:text-white" dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}/>

     
     

      
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Comments</h4>
        {post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment: Comment) => (
              
              <li key={comment.id} className="p-4 bg-gray-100 dark:bg-gray-500  rounded-md shadow-sm">
                 {userId === comment.author.id && (
                  <div className=" flex  space-x-2 justify-end ">
                    <CommentDelete commentId={comment.id} />
                  </div>
                )}
                <div className="">
               
               {userId === comment.author.id && <CommentUpdate
                      commentId={comment.id}
                      initialContent={comment.content}
                      onUpdate={(updatedContent) => {
                        setPost({
                          ...post,
                          comments: post.comments.map((c) =>
                            c.id === comment.id ? { ...c, content: updatedContent,updatedAt: new Date().toISOString() } : c
                          ),
                        });
                      }}
                    />
                    }
                     <p className="text-gray-700 dark:text-white">{comment.content}</p>
                </div>
                
                
                <span className="text-xs text-gray-500 dark:text-white">
                  - {comment.author.firstName} {comment.author.lastName}
                </span>
                <p className="text-gray-700 dark:text-white">{handleTimeFormat(comment.createdAt, comment.updatedAt)}</p>
              
               
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
      <p >{handleTimeFormat(post.createdAt, post.updatedAt)}</p>
    </div>
  );
};

export default PostDetail;
