import { useState } from "react";
import { postDelete } from "../../api/post";

type PostDeleteProps = {
  postId: string;
  onDelete: () => void; 
};

const PostDelete = ({ postId, onDelete }: PostDeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Post?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError("");

    try {
      await postDelete(postId);
      onDelete(); 
    } catch (error) {
      console.error("Error deleting Post:", error);
      setError("Failed to delete Post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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

export default PostDelete;