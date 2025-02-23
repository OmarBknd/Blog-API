import { useEffect, useState } from "react";
import { adminfetchComments } from "../../api/admin";
import { Comment } from "../../types";
import { format } from "date-fns";
import CommentDelete from "../../components/comments-management/CommentDelete";
const AdminComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    adminfetchComments()
      .then((data) => setComments(data.comments))
      .catch((err) => console.error(err));
  }, []);
 const handleTimeFormat = (date:string) =>{
   return format(new Date(date),` eeee dd/MM/yyyy 'at' hh:mm aaa`)
 }

 const handleCommentDelete = (deletedCommentId: string) => {
 
    return {   comments: comments.filter((c) => c.id !== deletedCommentId),
    };
  
}
  
  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">All Comments</h2>
      <ul className="space-y-2 dark:bg-gray-700">
        {comments.map((comment) => (
          <li key={comment.id} className="p-2 border rounded">
            {comment.content} (by {comment.author.firstName} {comment.author.lastName})
            <p> {handleTimeFormat(comment.createdAt)}</p>
            <CommentDelete
                    onDelete={()=>handleCommentDelete(comment.id)}
                    commentId={comment.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComments;
