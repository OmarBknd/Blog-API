import { useState } from "react";
import Tinymce from "../Tinymce";
import {postCreate} from "../../api/post";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const authorId = localStorage.getItem('userId')
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content, authorId };

    try {
      const response = await postCreate(postData);
      console.log("Post created successfully:", response);
      console.log('postdata', postData);
      
      
      
    } catch (error) {
      console.error("Failed to create post:", error);
      
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>
      <form action='/post/create' method="post" onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <Tinymce value={content} onChange={setContent} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
