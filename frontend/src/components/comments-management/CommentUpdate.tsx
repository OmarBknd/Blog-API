import { useState } from "react";
import { commentUpdate } from "../../api/comment";

type CommentUpdateProps = {
  commentId: string;
  initialContent: string;
  onUpdate: (updatedContent: string) => void;
};

const CommentUpdate = ({ commentId, initialContent, onUpdate }: CommentUpdateProps) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setContent(initialContent); // Reset content
    setIsEditing(false); // Hide form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      const response = await commentUpdate(commentId, { content });
      if (!response) {
        setError("Failed to update comment.");
        return;
      }
      setMessage("Comment updated successfully!");
      onUpdate(content);
      setIsEditing(false); // Hide the form after successful update
    } catch (error) {
      console.error("Error updating comment:", error);
      setError("Error updating comment.");
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
          className="mt-2 px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
      )}
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CommentUpdate;
