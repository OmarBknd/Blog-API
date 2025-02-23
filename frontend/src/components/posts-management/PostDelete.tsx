import { useState } from "react";
import { postDelete } from "../../api/post";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Tooltip } from 'react-tooltip';
type PostDeleteProps = {
  postId: string;
 
};

const PostDelete = ({ postId }: PostDeleteProps) => {
  const navigate= useNavigate()
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Post?");
    if (!confirmDelete) return;
  
    setError("");
  
    return toast.promise(
      postDelete(postId) 
        .then(() => {
          setTimeout(() => navigate('/'), 1000);
        }),
      {
        loading: "Deleting post...",
        success: "Post deleted",
        error: "Failed to delete post.",
      }
    );
  };
  
 
  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleDelete}
        id="delete-tooltip"
        className="flex gap-1 cursor-pointer dark:text-white    "
      >
        <Delete/>
        <Tooltip
        anchorSelect="#delete-tooltip"
        content="Delete post"
        />
      </button>
    </div>
  );
};

export default PostDelete;