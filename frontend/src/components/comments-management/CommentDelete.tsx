import { useState, useEffect } from "react";
import { commentDelete } from "../../api/comment";

type CommentDeleteProps = {
  commentId: string;
  authorId: string; 
  onDelete: () => void; 
};

const CommentDelete = ({ commentId, authorId, onDelete }: CommentDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [isAuthor, setIsAuthor] = useState(false); 

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    setIsAuthor(loggedInUserId === authorId); 
  }, [authorId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError("");

    try {
      await commentDelete(commentId);
      onDelete(); 
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAuthor) return null;

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default CommentDelete;
