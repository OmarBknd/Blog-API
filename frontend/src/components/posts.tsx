import { useState, useEffect } from 'react'
import { getPosts } from '../api';



const PostList = () => {
type Comment = {
    id: string;
    content: string;
}

    type Post = {
        id: string;
        title: string;
        content: string;
        comments: Comment[];
    }
    const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const data = await getPosts();
          console.log('Posts:', data); 
          console.log(typeof data);
          
          setPosts(data.posts);
        } catch (error) {
          console.error('Error fetching posts:', error); 
        }
      };
      fetchPosts();
    }, []);
  
    return (
        <div>
        <h1>Posts</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <div>{post.content}</div>
                    {post.comments.length > 0 && (
                        <ul>
                            {post.comments.map((comment) => (
                                <li key={comment.id}>{comment.content}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </div>
    );
  };

export {PostList}