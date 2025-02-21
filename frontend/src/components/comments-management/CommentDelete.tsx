import { useState } from "react";
import { commentDelete } from "../../api/comment";
import { Delete } from "lucide-react";
type CommentDeleteProps = {
  commentId: string;

};

const CommentDelete = ({ commentId, }: CommentDeleteProps) => {
  
  const [error, setError] = useState("");
 

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
    setError("");

    try {
      await commentDelete(commentId);
      
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
    }
  };

 

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleDelete}
        
        className="flex items-center gap-1 cursor-pointer"
      >
        <Delete/>
       
      </button>
    </div>
  );
};

export default CommentDelete;
