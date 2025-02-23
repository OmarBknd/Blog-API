import { useState, useEffect } from "react";
import { Post } from "../types";

export const usePost = (fetchPostsFn: () =>Promise<{ posts?: Post[]; post?: Post }>) => {
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchPostsFn();
        if (data.posts) {
          setPosts(data.posts);
        } else if (data.post) {
          setPosts([data.post]); 
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [fetchPostsFn]);


  const handlePostDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return { posts, setPosts, handlePostDelete };
};
