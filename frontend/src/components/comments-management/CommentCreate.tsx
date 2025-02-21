import { useState } from "react";
import { commentCreate } from "../../api/comment";

type CommentCreateProp = {
  postId : string;
  
}

const CommentCreate = ({postId}:CommentCreateProp) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postId) {
      setErrorMessage("Error: No post ID found.");
      return;
    }

    const commentData = { content }; 

    try {
      setIsSubmitting(true);
      setErrorMessage(""); 

      const response = await commentCreate(commentData, postId);
      console.log("Comment created successfully:", response);

      setSuccessMessage("Comment created successfully!");
      setContent(""); 
    } catch (error) {
      console.error("Failed to create comment:", error);
      setErrorMessage("Failed to create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-600 dark:text-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-white  ">
            Add a comment:
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setSuccessMessage(""); 
            }}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none dark:focus:border-indigo-500 focus:border-blue-500"
            rows={4}
            placeholder="Write your comment here..."
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 dark:bg-indigo-500 text-white px-4 py-2 rounded dark:hover:bg-indigo-600 hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Create Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
