import { useState } from "react";
import { commentCreate } from "../../api/comment";
import toast from "react-hot-toast";
type CommentCreateProp = {
  postId : string;
  
}

const CommentCreate = ({postId}:CommentCreateProp) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postId) {
      toast.error('No post id found!')
      return;
    }

    const commentData = { content }; 

    try {
      setIsSubmitting(true);
      

      await commentCreate(commentData, postId);
      
      toast.success('Comment created')
      
      setContent(""); 
    } catch (error) {
      console.error("Failed to create comment:", error);
      
      toast.error('Failed to create comment')
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
               
            }}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none dark:focus:border-indigo-500 focus:border-blue-500"
            rows={4}
            placeholder="Write your comment here..."
            required
          />
        </div>

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
