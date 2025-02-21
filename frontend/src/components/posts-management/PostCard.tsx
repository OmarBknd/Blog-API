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
    <div className="p-6 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold dark:text-white mb-2">{post.title}</h3>
      <p className="dark:text-white text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}/>

      <div className="flex justify-between items-center">
      <button
        onClick={() => navigate(`/post/${post.id}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
      >
        Read More
      </button>
      <p className="text-gray-400 font-bold text-sm"> {post.author.firstName} {post.author.lastName}</p>
      </div>
     
    </div>
  );
};

export default PostCard;
