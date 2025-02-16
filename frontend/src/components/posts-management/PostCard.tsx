import { useNavigate } from "react-router-dom";
import { Post } from "../../types";
import PostDelete from "./PostDelete";
import CommentCreate from "../comments-management/CommentCreate";
import CommentDelete from "../comments-management/CommentDelete";
import CommentUpdate from "../comments-management/CommentUpdate";

type PostCardProps = {
  post: Post;
  onCommentDelete: (postId: string, commentId: string) => void;
  onPostDelete: (postId: string) => void;
};

const PostCard = ({ post, onPostDelete, onCommentDelete }: PostCardProps) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Check if the current user is the author of the post
  const isAuthor = post.author && post.author.id === userId;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      
      {isAuthor && (
        <PostDelete
          postId={post.id}
          onDelete={() => onPostDelete(post.id)} 
        />
      )}

      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>

      
      {post.author && (
        <span className="block mt-4 text-sm text-gray-600">
          By{" "}
          <b className="text-gray-900">
            {post.author.firstName} {post.author.lastName}
          </b>
        </span>
      )}

     
      {isAuthor && (
        <button
          onClick={() => navigate(`/post/update/${post.id}`)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
      )}

      
      {post.comments.length > 0 && (
        <div className="mt-6">
          <h4 className="text-gray-800 font-semibold text-xl mb-3">Comments:</h4>
          <ul className="mt-2 space-y-3">
            {post.comments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-gray-700 text-base">{comment.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  - {comment.author.firstName} {comment.author.lastName}
                </span>
                <CommentDelete
                  authorId={comment.author.id}
                  commentId={comment.id}
                  onDelete={() => onCommentDelete(post.id, comment.id)}
                />
                <CommentUpdate
  commentId={comment.id}
  initialContent={comment.content} // Pass the existing comment content
  onUpdate={(updatedContent) => {
    // Handle the updated content (e.g., update the state or make an API call)
    console.log("Updated Comment:", updatedContent);
  }}
/>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <CommentCreate postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;