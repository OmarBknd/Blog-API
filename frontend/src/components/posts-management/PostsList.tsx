import { useState, useEffect } from "react";
import { getPosts } from "../../api";
import PostCard from "./PostCard";
import { Post } from "../../types";
const PostList = () => {
 

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCommentDelete = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) }
          : post
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} onCommentDelete={handleCommentDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PostList };
