import { useEffect, useState } from "react";
import { adminfetchComments } from "../../api/admin";
import { Comment } from "../../types";
import { format } from "date-fns";
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
  
  return (
    <div className="p-6 dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">All Comments</h2>
      <ul className="space-y-2 dark:bg-gray-700">
        {comments.map((comment) => (
          <li key={comment.id} className="p-2 border rounded">
            {comment.content} (by {comment.author.firstName} {comment.author.lastName})
            <p> {handleTimeFormat(comment.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComments;
