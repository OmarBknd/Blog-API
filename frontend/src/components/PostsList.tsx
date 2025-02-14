import { useState, useEffect } from "react";
import { getPosts } from "../api";
import CommentCreate from "./Comment";

const PostList = () => {
  type Comment = {
    id: string;
    content: string;
    author: {
      firstName: string;
      lastName: string;
    };
  };

  type Post = {
    id: string;
    title: string;
    content: string;
    comments: Comment[];
    author: {
      firstName: string;
      lastName: string;
    };
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        console.log("Posts:", data);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Latest Posts
      </h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
            <span className="block mt-4 text-sm text-gray-600">
              By{" "}
              <b className="text-gray-900">
                {post.author.firstName} {post.author.lastName}
              </b>
            </span>

            {post.comments.length > 0 && (
              <div className="mt-6">
                <h4 className="text-gray-800 font-semibold text-xl mb-3">Comments:</h4>
                <ul className="mt-2 space-y-3">
                  {post.comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <p className="text-gray-700 text-base">{comment.content}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        - {comment.author.firstName} {comment.author.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6">
              <CommentCreate postId={post.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PostList };