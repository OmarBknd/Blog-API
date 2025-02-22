import { useState } from "react";
import { commentUpdate } from "../../api/comment";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
type CommentUpdateProps = {
  commentId: string;
  initialContent: string;
  onUpdate: (updatedContent: string) => void;
};

const CommentUpdate = ({ commentId, initialContent, onUpdate }: CommentUpdateProps) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
 

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setContent(initialContent); // Reset content
    setIsEditing(false); // Hide form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    

    try {
      const response = await commentUpdate(commentId, { content });
      if (!response) {
        toast.error("Failed to update comment.");
        return;
      }
      toast.success("Comment updated successfully!");
      onUpdate(content);
      setIsEditing(false); // Hide the form after successful update
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Error updating comment.");
    }
  };

  return (
    <div className="mt-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-24"
            placeholder="Edit your comment..."
            required
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleEditClick}
          id="edit-tooltip"
          className=" text-sm flex items-center gap-1 cursor-pointer  "
        >
          <Edit className="size-4"/>
          <Tooltip
        anchorSelect="#edit-tooltip"
        content="Edit comment"
        />
        </button>
      )}
      
    </div>
  );
};

export default CommentUpdate;
