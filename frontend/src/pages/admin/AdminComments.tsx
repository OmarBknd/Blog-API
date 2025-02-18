import { useEffect, useState } from "react";
import { adminfetchComments } from "../../api/admin";

interface Comment {
  id: string;
  content: string;
  author: { firstName: string; lastName: string };
}

const AdminComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    adminfetchComments()
      .then((data) => setComments(data.comments))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Comments</h2>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="p-2 border rounded">
            {comment.content} (by {comment.author.firstName} {comment.author.lastName})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComments;
