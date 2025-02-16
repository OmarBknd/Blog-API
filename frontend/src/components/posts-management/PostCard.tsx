import CommentCreate from "../comments-management/CommentCreate";
import CommentDelete from "../comments-management/CommentDelete";
import { useNavigate } from "react-router-dom";
import { Post } from "../../types";



type PostCardProps = {
  post: Post;
  onCommentDelete: (postId: string, commentId: string) => void;
};

const PostCard = ({ post, onCommentDelete }: PostCardProps) => {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  


  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
      <span className="block mt-4 text-sm text-gray-600">
        By{" "}
        <b className="text-gray-900">
          {post.author.firstName} {post.author.lastName}
        </b>
      </span>
      {post.author.id === userId &&  <button
        onClick={() => navigate(`/post/update/${post.id}`)}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit
      </button>}
     
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
