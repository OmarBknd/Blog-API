import { useState, useEffect } from "react";
import { Post } from "../types";

export const usePost = (fetchPostsFn: () => Promise<{ posts: Post[] }>) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostsFn();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [fetchPostsFn]);

  const handleCommentDelete = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) }
          : post
      )
    );
  };

  const handlePostDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return { posts, setPosts, handleCommentDelete, handlePostDelete };
};
