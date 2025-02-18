import { useEffect, useState } from "react";
import { adminfetchPosts } from "../../api/admin";

type Post = {
  id: string;
  title: string;
  author: { firstName: string; lastName: string };
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    adminfetchPosts()
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-2 border rounded">
            {post.title} (by {post.author.firstName} {post.author.lastName})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPosts;
