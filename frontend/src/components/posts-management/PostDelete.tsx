import { useState } from "react";
import { postDelete } from "../../api/post";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

    try {
      await postDelete(postId);
      setTimeout(() => navigate('/'),1000)
    } catch (error) {
      console.error("Error deleting Post:", error);
      setError("Failed to delete Post. Please try again.");
    } 
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleDelete}
        
        className="flex gap-1 cursor-pointer dark:text-white    "
      >
        <Delete/>
       Delete Post 
      </button>
    </div>
  );
};

export default PostDelete;