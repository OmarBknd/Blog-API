import { getPosts } from "../../api";
import { usePost } from "../../hooks/usePost";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts } = usePost(getPosts);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
