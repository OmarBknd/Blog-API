import { commentDelete } from "../../api/comment";
import { Delete } from "lucide-react";
import { toast } from "react-hot-toast";
type CommentDeleteProps = {
  commentId: string;
  onDelete : (commentId:string) => void
};

const CommentDelete = ({ commentId, onDelete }: CommentDeleteProps) => {
  
  
 

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
    

    try {
      await commentDelete(commentId);
      onDelete(commentId)
      toast.success('Comment deleted')
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

 

  return (
    <div>
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
