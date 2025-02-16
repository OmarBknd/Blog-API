
import { getPosts } from "../../api";
import { usePost } from "../../hooks/usePost";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts, handleCommentDelete, handlePostDelete } = usePost(getPosts);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} onCommentDelete={handleCommentDelete} onPostDelete={handlePostDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PostList };
