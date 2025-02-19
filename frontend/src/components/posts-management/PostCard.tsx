import { useNavigate } from "react-router-dom";
import { Post } from "../../types";
import  DOMPurify  from "dompurify";
type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();
  
  
  // Limit post preview to 100 characters
  const previewContent = post.content.length > 100
    ? post.content.substring(0, 100) + "..."
    : post.content;
    const sanitizedPostContent = DOMPurify.sanitize(previewContent);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}/>

      <button
        onClick={() => navigate(`/post/${post.id}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Read More
      </button>
    </div>
  );
};

export default PostCard;
